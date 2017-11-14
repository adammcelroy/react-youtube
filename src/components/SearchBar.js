import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import jsonp from 'jsonp';
import queryString from 'query-string';

class SearchBar extends Component {
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
		if (query) {
			jsonp(
				`http://suggestqueries.google.com/complete/search?ds=yt&client=youtube&q=${query}`,
				{param: 'jsonp'},
				(err, data) => {
					if (!err) {
						this.setState({
							suggestions: data[1].map(s => s[0]),
						});
					}
				}
			);
		} else {
			this.setState({suggestions: []});
		}
	}

	handleSuggestionClick(event) {
		const suggestion = event.currentTarget.textContent;

		this.setState({query: suggestion}, () => {
			/*
			* Submitting form programatically causes native event
			* to be fired, not synthetic, and therefore the onSubmit
			* handler won't fire. A simple workaround here is to
			* click the submit button instead.
			* */
			this.refs.searchSubmit.click();
		});
	}

	handleFocus() {
		this.setState({showSuggestions: true});
	}

	handleBlur() {
		/*
		* Delay closing the suggestions to give any click events
		* time to propagate.
		* */
		setTimeout(() => {
			this.setState({
				suggestions: [],
				showSuggestions: false,
			});
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
			const query = decodeURI(this.state.query).replace(/ /g, '+');

			this.props.history.push({
				pathname: '/results',
				search: `?search_query=${query}`,
			});

			this.refs.searchBar.blur();
		}
	}

	render() {
		const {
			query,
			showSuggestions,
			suggestions,
		} = this.state;
		
		const { autofocus } = this.props;

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
								{suggestions.map((suggestion) => {
									const suggestionHTML = suggestion.replace(query, `<em>${query}</em>`);

									return (
										<div key={suggestion} className="search-bar__suggestion-wrapper">
											<div
												className="search-bar__suggestion"
												dangerouslySetInnerHTML={{
													__html: suggestionHTML,
												}}
												onClick={this.handleSuggestionClick}
											></div>
										</div>
									);
								})}
							</div>
						</div>
					}
				</form>
			</div>
		);
	}
}

export default withRouter(SearchBar);
