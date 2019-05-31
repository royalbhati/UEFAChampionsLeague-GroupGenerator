import React, { Component } from 'react'
import { Layout } from 'antd';
import GroupCard from './card'
import Nav from './nav'
import _ from 'lodash'
const { Content } = Layout;
const data = require('./data.json')

export default class dashboard extends Component {
    state = {
        groups: [],
        loaded: false
    }

    generateGroups = () => {
        const ucl = data.concat()
        const shuffle = (array) => {
            var currentIndex = array.length, temporaryValue, randomIndex;

            while (0 !== currentIndex) {
                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }

        // Shuffling everytime to have random selection
        shuffle(ucl)

        function getGroups() {
            const group = []
            // making an array of winners
            const winners = ucl.filter(element => {
                return element.winner
            });
            // iterating over the winners since there are only 8 groups and also 8 winners
            for (let x in winners) {
                //temporary Array to store single groups slected for the final batch
                let tempArr = []
                // country array to check theres only single country in each group
                let countryArr = []
                tempArr.push(winners[x])
                countryArr.push(winners[x].country)

                while (ucl.length !== 0) {
                    let count = 0
                    //loop over possible outcomes until we get a batch size of 4
                    while (tempArr.length < 4) {
                        count = count + 1
                        const next = ucl[Math.floor(Math.random(0, ucl.length) * ucl.length)]

                        //array to check if theres an existing country
                        const countryCount = countryArr.filter(el => {
                            return el === next.country
                        })

                        if (next.winner !== true && (countryCount.length === 0)) {
                            tempArr.push(next)
                            //removes the club that is already selected into a group
                            // to avoid unecessary computaion
                            _.pullAllBy(ucl, [{ 'name': next.name }], 'name');
                            countryArr.push(next.country)
                        }
                        if (count > 10) {
                            break
                        }
                    }
                    group.push(tempArr)
                    break
                }
            }

            let totalTeams = 0
           // eslint-disable-next-line
            group.map(el => { el.map(elem => { totalTeams = totalTeams + 1 }) })

            if (totalTeams < 32) {
                return -1
            }
            else {
                return group
            }
        }
        return getGroups()
    }
    componentDidMount() {
        let generatedGroups = this.generateGroups()
        if (generatedGroups === -1) {
            this.componentDidMount()
        } else {
            this.setState({
                groups: generatedGroups,
                loaded: true
            })
        }
    }

    renderGroups = () => {
        return this.state.groups.map((elem, i) => (
            <GroupCard data={elem} index={i} key={i} className="box" ></GroupCard>
        ))
    }
    onclick = () => {
        this.componentDidMount()
    }
    render() {
        return (
            <div>
                <Layout>
                    <Nav>
                        <div className="logoDiv">
                        <img className="logo bounce" onClick={() => this.onclick()} src={require('../logo2.png')} alt="logo" />
                        </div>
                    </Nav>
                    <div style={{ textAlign: 'center' }}>
                        <p className="infoText">click on the uefa logo for another set of groups</p>
                    </div>

                    <Content style={{ background: '#fff', padding: 24, marginTop: 35, minHeight: 280 }}>

                        <div className="drawGrid">
                            {this.state.loaded && this.renderGroups()}
                        </div>
                    </Content>
                </Layout>
            </div>
        )
    }
}