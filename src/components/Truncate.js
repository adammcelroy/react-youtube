import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { default as TruncateLibrary } from 'react-truncate';

class Truncate extends Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		text: PropTypes.node,
		lines: PropTypes.number,
	};

	static defaultProps = {
		lines: 3,
		more: 'Show more',
		less: 'Show less',
	};

	constructor(...args) {
		super(...args);

		this.state = {expanded: false, truncated: false};

		this.handleTruncate = this.handleTruncate.bind(this);
		this.toggleLines = this.toggleLines.bind(this);
	}

	handleTruncate(truncated) {
		this.setState({truncated});
	}

	toggleLines(event) {
		event.preventDefault();
		this.setState({expanded: !this.state.expanded});
	}

	render() {
		const { children, more, less, lines } = this.props;
		const { expanded, truncated } = this.state;

		return (
			<div>
				<TruncateLibrary
					lines={!expanded && lines}
					onTruncate={this.handleTruncate}
					ellipsis={more && (more === '...') ? '…' : (
						<span>
							…
							<br />
							<a
								href=""
								className="truncate-trigger"
								onClick={this.toggleLines}
							>
								{more}
							</a>
						</span>
					)}
				>
					{children}
				</TruncateLibrary>

				{!truncated && expanded && (
					<span>
						<br />
						<a
							href=""
							className="truncate-trigger"
							onClick={this.toggleLines}
						>
							{less}
						</a>
					</span>
				)}
			</div>
		);
	}
}

export default Truncate;
