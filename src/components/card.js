import React, { Component } from 'react'
const GroupName = ["A", "B", "C", "D", "E", "F", "G", "H"]
export default class GroupCard extends Component {
  renderList = () => {
    return this.props.data.map(elem => (
      <li className="list-item"><img className="clubllogo" src={elem.logo} alt="logo" />&nbsp;&nbsp;<span className="clubName">{elem.name}</span></li>
    ))
  }

  render() {
    return (
      <div>
        <div class="card groupCard">
          <header class="card-header">
            <p class="card-header-title">
              Group {GroupName[this.props.index]}
            </p>
          </header>
          <div class="card-content">
            <ul>
              {this.renderList()}
            </ul>
          </div>

        </div>
      </div>
    )
  }
}