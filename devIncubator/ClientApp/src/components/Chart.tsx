import * as React from 'react';
import '../../node_modules/react-vis/dist/style.css';
import { XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, LineMarkSeries, makeVisFlexible, makeWidthFlexible, makeHeightFlexible, Crosshair, FlexibleXYPlot, FlexibleHeightXYPlot, FlexibleWidthXYPlot } from 'react-vis';


interface IState {
    crosshairValues: { x: number; y: number; }[]
    leftY: number
    rightY: number
}
interface IProps {
    data: { x: number, y: number }[][]
    tickValues: number[]
    fromX: number
    toX: number
    maxY: number
    minY: number
}
export class Chart extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            leftY: 10,
            rightY: 10,
            crosshairValues: []
        }
    }
    _onMouseLeave = () => {
        this.setState({ crosshairValues: [] });
    };
    _onNearestX = (value: any, { index }: any) => {
        this.setState({ crosshairValues: this.props.data.map(d => d[index]) });
    };

    render() {
        const xDomain = [this.props.fromX, this.props.toX]
        const yDomain = [this.props.minY, this.props.maxY]
        const xAxisOn0 = true
        const yAxisOn0 = true
        const verticalTickValues = [0]
        return (
            <FlexibleXYPlot  onMouseLeave={this._onMouseLeave} {...{ xDomain, yDomain }}>
                {!verticalTickValues || verticalTickValues.length ? (
                    <VerticalGridLines tickValues={verticalTickValues} />
                ) : null}
                <HorizontalGridLines />
                <XAxis on0={xAxisOn0} tickValues={this.props.tickValues} />
                <YAxis on0={yAxisOn0} />
                <LineSeries
                    className="linemark-series-example-2"
                    curve={'curveMonotoneX'}
                    onNearestX={this._onNearestX} data={this.props.data[0]}
                />
                <Crosshair
                    values={this.state.crosshairValues}
                    className={'test-class-name'}
                />
            </FlexibleXYPlot>
        )
    }
}