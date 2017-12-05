import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import jsonp from 'jsonp';
import queryString from 'query-string';

export class SearchBar extends Component {
	static propTypes = {
		autofocus: PropTypes.bool,
	};

	static defaultProps = {
		autofocus: false,
	};

	constructor(props) {
		super(props);

		this.state = {
			query: queryString.parse(props.location.search).search_query || '',
			showSuggestions: false,
			suggestions: [],
		};

		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSuggestionClick = this.handleSuggestionClick.bind(this);
	}

	getSearchSuggestions(query) {
		if (!query) {
			this.setState({suggestions: []});
			return;
		}

		return new Promise((resolve, reject) => {
			jsonp(
				`http://suggestqueries.google.com/complete/search?ds=yt&client=youtube&q=${query}`,
				{param: 'jsonp'},
				(err, data) => {
					if (!err) {
						const suggestions = data[1].map(s => s[0]);

						this.setState({suggestions});

						resolve(suggestions);
					}
					reject([]);
				}
			);
		});
	}

	search(query) {
		this.props.history.push({
			pathname: '/results',
			search: `?search_query=${this.selectiveEncode(query)}`,
		});
	}

	selectiveEncode(uri) {
		return decodeURI(uri)
			.split(' ').join('+')
			.split('?').join('%3F')
			.split('&').join('%26')
			.split('=').join('%3D');
	}

	handleSuggestionClick(event) {
		const suggestion = event.currentTarget.textContent;

		this.setState({query: suggestion}, () => {
			this.refs.searchSubmit.click();
		});
	}

	handleFocus() {
		this.setState({showSuggestions: true});
	}

	handleBlur() {
		setTimeout(() => {
			this.setState({showSuggestions: false, suggestions: []});
		}, 300);
	}

	handleChange(event) {
		const query = event.target.value;
		this.setState({query});
		this.getSearchSuggestions(query);
	}

	handleSubmit(event) {
		event.preventDefault();

		if (this.state.query) {
			this.search(this.state.query);
			this.refs.searchBar.blur();
		}
	}

	renderSuggestion(suggestion, query) {
		const suggestionHTML = suggestion.replace(query, `<em>${query}</em>`);

		return (
			<div key={suggestion} className="search-bar__suggestion-wrapper">
				<div
					className="search-bar__suggestion"
					dangerouslySetInnerHTML={{__html: suggestionHTML}}
					onClick={this.handleSuggestionClick}
				></div>
			</div>
		);
	}

	render() {
		const { autofocus } = this.props;
		const { query, showSuggestions, suggestions } = this.state;

		return (
			<div role="search" className="search-bar-wrapper">
				<form
					className="search-bar"
					onSubmit={this.handleSubmit}
				>
					<div className="input-group">
						<input
							type="search"
							className="form-control search-bar__input"
							id="searchBar"
							ref="searchBar"
							aria-label="Search"
							placeholder="Search"
							value={query}
							spellCheck="false"
							autoComplete="off"
							autoCorrect="off"
							autoCapitalize="off"
							onFocus={this.handleFocus}
							onBlur={this.handleBlur}
							onChange={this.handleChange}
							autoFocus={autofocus}
						/>

						<span className="input-group-btn">
							<button
								type="submit"
								ref="searchSubmit"
								className="btn search-bar__submit"
							>
								<i className="fa fa-search"></i>
							</button>
						</span>
					</div>

					{showSuggestions && suggestions && suggestions.length > 0 &&
						<div className="search-bar__suggestions-wrapper">
							<div className="search-bar__suggestions">
								{suggestions.map(s => this.renderSuggestion(s, query))}
							</div>
						</div>
					}
				</form>
			</div>
		);
	}
}

export default withRouter(SearchBar);
