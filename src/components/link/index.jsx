import React from 'react';

/**
 * Link component is responsible for encapsulating link render.
 * @example
 * const onClickLink = function(source, target) {
 *      window.alert(`Clicked link between ${source} and ${target}`);
 * };
 *
 * const onMouseOverLink = function(source, target) {
 *      window.alert(`Mouse over in link between ${source} and ${target}`);
 * };
 *
 * const onMouseOutLink = function(source, target) {
 *      window.alert(`Mouse out link between ${source} and ${target}`);
 * };
 *
 * <Link
 *     source='idSourceNode'
 *     target='idTargetNode'
 *     x1=22
 *     y1=22
 *     x2=22
 *     y2=22
 *     strokeWidth=1.5
 *     stroke='green'
 *     className='link'
 *     opacity=1
 *     onClickLink={onClickLink}
 *     onMouseOverLink={onMouseOverLink}
 *     onMouseOutLink={onMouseOutLink} />
 */
export default class Link extends React.Component {
    /**
     * Handle link click event.
     * @returns {undefined}
     */
    handleOnClickLink = () => this.props.onClickLink
                            && this.props.onClickLink(this.props.source, this.props.target);

    /**
     * Handle mouse over link event.
     * @returns {undefined}
     */
    handleOnMouseOverLink = () => this.props.onMouseOverLink
                            && this.props.onMouseOverLink(this.props.source, this.props.target);

    /**
     * Handle mouse out link event.
     * @returns {undefined}
     */
    handleOnMouseOutLink = () => this.props.onMouseOutLink
                            && this.props.onMouseOutLink(this.props.source, this.props.target);

    render() {
        const lineStyle = {
            strokeWidth: this.props.strokeWidth,
            stroke: this.props.stroke,
            opacity: this.props.opacity
        };

        const lineProps = {
            className: this.props.className,
            onClick: this.handleOnClickLink,
            onMouseOut: this.handleOnMouseOutLink,
            onMouseOver: this.handleOnMouseOverLink,
            style: lineStyle,
            x1: this.props.x1,
            x2: this.props.x2,
            y1: this.props.y1,
            y2: this.props.y2
        };

        return (
            <line {...lineProps} />
        );
    }
}
