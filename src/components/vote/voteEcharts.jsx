import React, { Component } from 'react';

import * as echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';

class VoteEcharts extends Component {
    initEchart(count) {
        var myChart = echarts.init(document.getElementById('main'));
        myChart.setOption({
            title: {
                text: count,
                subtext: 'Voting Number',
                left: "49.5%",
                top: "38%",
                textAlign: 'center',
                textStyle: {
                    color: '#10164B',
                    fontSize: '3.8rem',
                    fontFamily: 'Roboto-Light',
                    align: 'center',
                    width: '12.6rem',
                    height: '3.8rem'
                },
                subtextStyle: {
                    color: '#10164B',
                    fontSize: '1.6rem',
                    fontFamily: 'Roboto-Light',
                    align: 'center',
                    width: '12.6rem',
                    height: '2.4rem'
                },
            },
            tooltip: {
                trigger: 'item',
                confine: true,
                formatter: "{c} <br/>{b}:  ({d}%)",
            },
            color: ["#C9B2FF", "#B3F1E7", "#7DDC8B", "#96E9F2", "#FFC475", "#D51172"],
            legend: {
                show: true,
                orient: 'horizontal',
                x: 'center',
                y: 'bottom',
                align: 'left',
                icon: 'circle',
                textStyle: {
                    fontWeight: 300,
                    color: '#10164B',
                    fontSize: '2.2rem',
                    fontFamily: 'Roboto-Light'
                }
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    center: ['50%', '47%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: true,
                        formatter: '{c}    {d}%\n\r{b}',
                        textStyle: {
                            fontWeight: 300,
                            color: '#10164B',
                            fontSize: '2.2rem',
                            fontFamily: 'Roboto-Light'
                        },
                        position: 'outside'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            textStyle: {
                                fontSize: '14',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true
                        }
                    },
                    data: this.props.optionlist
                }
            ]
        }, true);
    }

    componentDidMount() {
        if (this.props.optionlist.length) {
            let count = 0
            this.props.optionlist.forEach((item) => { count += item.value })
            this.initEchart(count)
        }
    }

    render() {
        return (
            <div id="main" style={{ width: '100%', height: '100%' }} />
        );
    }
}

export default VoteEcharts;
