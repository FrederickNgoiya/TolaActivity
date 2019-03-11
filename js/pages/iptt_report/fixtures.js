// fixtures for building/testing
export const contextFixture = {
    labels: {
        filterTitle: "Report options",
        reportTitle: "Indicator performance tracking table",
        sidebarToggle: "Show/hide filters",
        pin: 'Pin',
        excel: 'Excel',
        programSelect: 'Program',
        periodSelect: {
            tva: 'Target periods',
            timeperiods: 'Time periods'
        },
        showAll: 'Show all',
        mostRecent: 'Most recent',
        startPeriod: 'Start',
        endPeriod: 'End',
        timeperiods: {
            3: 'Years',
            4: 'Semi-annual periods',
            5: 'Tri-annual periods',
            6: 'Quarters',
            7: 'Months'
        },
        targetperiods: {
            2: 'Midline and endline',
            3: 'Annual',
            4: 'Semi-annual',
            5: 'Tri-annual',
            6: 'Quarterly',
            7: 'Monthly'
        },
        periodNames: {
            3: 'Year',
            4: 'Semi-annual period',
            5: 'Tri-annual period',
            6: 'Quarter'
        },
    },
    programs: [
        {
            name: "TolaData Demo",
            id: 542,
            frequencies: [3, 5, 6],
            periodDateRanges: {
                1: [
                    [
                        'Apr 1, 2018',
                        'Mar 31, 2019'
                    ]
                ],
                2: [
                    [
                        'Apr 1, 2018',
                        'Mar 31, 2019'
                    ]
                ],
                3: [
                    [
                        'Apr 1, 2018',
                        'Mar 31, 2019'
                    ]
                ],
                4: [
                    [
                        'Apr 1, 2018',
                        'Sept 30, 2018'
                    ],
                    [
                        'Oct 1, 2018',
                        'Mar 31, 2019'
                    ]
                ],
                5: [
                    [
                        'Apr 1, 2018',
                        'Jul 31, 2018'
                    ],
                    [
                        'Aug 1, 2018',
                        'Nov 30, 2018'
                    ],
                    [
                        'Dec 1, 2018',
                        'Mar 31, 2018'
                    ]
                ],
                6: [
                    [
                        'Apr 1, 2018',
                        'Jun 30, 2018'
                    ],
                    [
                        'Jul 1, 2018',
                        'Sept 30, 2018'
                    ],
                    [
                        'Oct 1, 2018',
                        'Dec 31, 2018'
                    ],
                    [
                        'Jan 1, 2019',
                        'Mar 31, 2019'
                    ]
                ],
                7: [
                    [
                        'Apr 1, 2018',
                        'Apr 30, 2018',
                        'April',
                        '2018'
                    ],
                    [
                        'May 1, 2018',
                        'May 31, 2018',
                        'May',
                        '2018'
                    ],
                    [
                        'June 1, 2018',
                        'June 30, 2018',
                        'June',
                        '2018'
                    ],
                    [
                        'July 1, 2018',
                        'July 31, 2018',
                        'July',
                        '2018'
                    ],
                    [
                        'Aug 1, 2018',
                        'Aug 31, 2018',
                        'August',
                        '2018'
                    ],
                    [
                        'Sept 1, 2018',
                        'Sept 30, 2018',
                        'September',
                        '2018'
                    ],
                    [
                        'Oct 1, 2018',
                        'Oct 31, 2018',
                        'October',
                        '2018'
                    ],
                    [
                        'Nov 1, 2018',
                        'Nov 30, 2018',
                        'November',
                        '2018'
                    ],
                    [
                        'Dec 1, 2018',
                        'Dec 31, 2018',
                        'December',
                        '2018'
                    ],
                    [
                        'Jan 1, 2019',
                        'Jan 31, 2019',
                        'January',
                        '2019'
                    ],
                    [
                        'Feb 1, 2019',
                        'Feb 28, 2019',
                        'February',
                        '2019'
                    ],
                    [
                        'Mar 1, 2019',
                        'Mar 31, 2019',
                        'March',
                        '2019'
                    ]
                ]
            }
        },
        {
            name: "TolaData Test",
            id: 442,
            frequencies: [2, 3, 4],
            periodDateRanges: {
                1: [
                    [
                        'Apr 1, 2016',
                        'Mar 31, 2017'
                    ]
                ],
                2: [
                    [
                        'Apr 1, 2016',
                        'Mar 31, 2017'
                    ]
                ],
                3: [
                    [
                        'Apr 1, 2016',
                        'Mar 31, 2017'
                    ]
                ],
                4: [
                    [
                        'Apr 1, 2016',
                        'Sept 30, 2016'
                    ],
                    [
                        'Oct 1, 2016',
                        'Mar 31, 2017'
                    ]
                ],
                5: [
                    [
                        'Apr 1, 2016',
                        'Jul 31, 2016'
                    ],
                    [
                        'Aug 1, 2016',
                        'Nov 30, 2016'
                    ],
                    [
                        'Dec 1, 2016',
                        'Mar 31, 2017'
                    ]
                ],
                6: [
                    [
                        'Apr 1, 2016',
                        'Jun 30, 2016'
                    ],
                    [
                        'Jul 1, 2016',
                        'Sept 30, 2016'
                    ],
                    [
                        'Oct 1, 2016',
                        'Dec 31, 2016'
                    ],
                    [
                        'Jan 1, 2017',
                        'Mar 31, 2017'
                    ]
                ],
                7: [
                    [
                        'Apr 1, 2016',
                        'Apr 30, 2016',
                        'April',
                        '2016'
                    ],
                    [
                        'May 1, 2016',
                        'May 31, 2016',
                        'May',
                        '2016'
                    ],
                    [
                        'June 1, 2016',
                        'June 30, 2016',
                        'June',
                        '2016'
                    ],
                    [
                        'July 1, 2016',
                        'July 31, 2016',
                        'July',
                        '2016'
                    ],
                    [
                        'Aug 1, 2016',
                        'Aug 31, 2016',
                        'August',
                        '2016'
                    ],
                    [
                        'Sept 1, 2016',
                        'Sept 30, 2016',
                        'September',
                        '2016'
                    ],
                    [
                        'Oct 1, 2016',
                        'Oct 31, 2016',
                        'October',
                        '2016'
                    ],
                    [
                        'Nov 1, 2016',
                        'Nov 30, 2016',
                        'November',
                        '2016'
                    ],
                    [
                        'Dec 1, 2016',
                        'Dec 31, 2016',
                        'December',
                        '2016'
                    ],
                    [
                        'Jan 1, 2017',
                        'Jan 31, 2017',
                        'January',
                        '2017'
                    ],
                    [
                        'Feb 1, 2017',
                        'Feb 28, 2017',
                        'February',
                        '2017'
                    ],
                    [
                        'Mar 1, 2017',
                        'Mar 31, 2017',
                        'March',
                        '2017'
                    ]
                ]
            }
        }
    ]
};