import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bots: [],
      nodes: [],
      box: [],
      botsLocation: [],
      nodesLocation: [],
      botsName: []
    };
  }

  componentDidMount() {
    //getting the bots
    axios
      .get("https://headlight-tournament-1.herokuapp.com/bots")
      .then(res => {
        return res.data.Bots;
      })
      .then(data => {
        let temp = [];
        let name = [];
        for (let i = 0; i < data.length; i++) {
          const X = data[i].Location.X;
          const Y = data[i].Location.Y;
          const coordinate = X + "" + Y;
          temp.push(coordinate);
          name.push(data[i].Id);
        }

        this.setState({
          botsName: name,
          botsLocation: temp
        });

        return true;
      })
      .then(x => {
        this.generate();
      })
      .catch(error => {
        console.log(error);
      });

    //getting the nodes
    axios
      .get("https://headlight-tournament-1.herokuapp.com/nodes")
      .then(res => {
        return res.data.Nodes;
      })
      .then(data => {
        let temp = [];
        for (let i = 0; i < data.length; i++) {
          const X = data[i].Location.X;
          const Y = data[i].Location.Y;
          const coordinate = X + "" + Y;
          temp.push(coordinate);
        }
        this.setState({
          nodesLocation: temp
        });
        return true;
      })
      .then(x => {
        this.generate();
      })
      .catch(error => {
        console.log(error);
      });
  }

  generate() {
    let temp = [];
    const botLocation = this.state.botsLocation;
    const nodeLocation = this.state.nodesLocation;

    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        const text = i + "" + j;
        if (botLocation.includes(text) && nodeLocation.includes(text)) {
          const name = botLocation.indexOf(text);
          temp.push(
            <div className="box-bot-node" key={"x" + i + "y" + j}>
              {this.state.botsName[name]}
            </div>
          );
        } else if (botLocation.includes(text)) {
          const name = botLocation.indexOf(text);
          temp.push(
            <div className="box-bot" key={"x" + i + "y" + j}>
              {this.state.botsName[name]}
            </div>
          );
        } else if (nodeLocation.includes(text)) {
          temp.push(<div className="box-nodes" key={"x" + i + "y" + j} />);
        } else {
          temp.push(<div className="box" key={"x" + i + "y" + j} />);
        }
      }
    }

    this.setState({
      box: temp
    });
  }

  render() {
    return (
      <div className="container-fluid text-center">
        <h1>Mars Service Engineer</h1>
        <div className="row">
          <div className="col">
            <p>
              <strong>Legends</strong>: Mining nodes{" "}
              <span className="legend-node" />| Bot{" "}
              <span className="legend-bot" />| Bot and Nodes on same square{" "}
              <span className="legend-bot-node" />
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="board">{this.state.box} </div>
          </div>
        </div>
        <div className="footer">Created by: Daniel Constantine</div>
      </div>
    );
  }
}

export default App;
