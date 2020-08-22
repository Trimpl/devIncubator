import * as React from 'react';
import { connect } from 'react-redux'; import { ApplicationState } from '../store';
import * as CalculatorStore from '../store/Calculator';
import { Chart } from './Chart';

interface IState {
  k: number
  b: number
  c: number
  fromX: number
  toX: number
  tickValues: number[]
  step: number
}
type CalculatorProps =
  CalculatorStore.CalculatorState
  & typeof CalculatorStore.actionCreators
const DATA = [
  [{ x: 1, y: 10 }, { x: 2, y: 7 }, { x: 3, y: 15 }]];
class Home extends React.PureComponent<CalculatorProps, IState> {
  constructor(props: CalculatorProps) {
    super(props)
    this.state = {
      k: 0,
      b: 0,
      c: 0,
      fromX: 0,
      toX: 0,
      tickValues: [],
      step: 1
    }
  }
  changeTickValues() {
    var tickValues: number[] = []
    const plus = Number(this.state.step) == 0 ? 1 : Number(this.state.step)
    const fromX = Number(this.state.fromX)
    const toX = Number(this.state.toX)
    if (fromX < 0) {
      for (var i = 0; i > fromX - 10; i -= plus) {
        tickValues.push(i)
      }
      tickValues.push(fromX - 10)
      for (var i = 0; i < toX + 10; i += plus) {
        tickValues.push(i)
      }
      tickValues.push(toX + 10)
    }
    else {
      for (var i = fromX - 10; i < toX + 10; i += plus) {
        tickValues.push(i)
      }
      tickValues.push(toX + 10)
    }
    console.log(tickValues)
    this.setState({ tickValues: tickValues })
  }
  render() {
    return (
      <div style={{ height: "70vh" }}>
        <Chart
          data={this.props.data}
          tickValues={this.state.tickValues}
          fromX={this.state.fromX - 10}
          toX={this.state.toX + 10}
          maxY={this.props.maxY}
          minY={this.props.minY} />
        <div className="mb-5 shadow p-3 w-auto">
          <div className="my-1">
            Step: <input type="number" style={{ width: 50 }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                console.log(Number(event.target.value))
                this.setState({ step: Number(event.target.value) }, () => this.changeTickValues())
              }} />
          </div>
          <div className="my-1">
            From: <input type="number" style={{ width: 50 }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                this.setState({ fromX: Number(event.target.value) }, () => this.changeTickValues())
              }} />
            to: <input type="number" style={{ width: 50 }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                this.setState({ toX: Number(event.target.value) }, () => this.changeTickValues())
              }} />
          </div>
          <div className="my-1">
            Function: y=<input type="number" style={{ width: 50 }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => { this.setState({ k: Number(event.target.value) }) }} />
            x^2 + <input type="number" style={{ width: 50 }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => { this.setState({ b: Number(event.target.value) }) }} />
            x + <input type="number" style={{ width: 50 }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => { this.setState({ c: Number(event.target.value) }) }} />
          </div>
        </div>
        <button className="btn btn-dark" onClick={() => this.props.request(this.state.k, this.state.b, this.state.c, this.state.fromX, this.state.toX, this.state.step)}>Plot</button>
      </div>
    )
  }
}

export default connect(
  (state: ApplicationState) => state.calculator,
  CalculatorStore.actionCreators
)(Home as any);
