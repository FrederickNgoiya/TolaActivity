import React from 'react';
import { computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import HeaderRow from './headers';

const LevelNameCell = ({ name, rowCount }) => {
    return <td className="table-cell level-cell" rowSpan={ rowCount }>{ name }</td>;
}

const IndicatorCell = ({ indicator, ontology }) => {
    let name = gettext('Indicator');
    if (ontology || indicator.level_order_display) {
        name += ` ${ontology}${indicator.level_order_display}`;
    }
    name += `: ${indicator.name}`;
    return (
        <td className="table-cell--text">
            { name }
        </td>
    );
}

const MeansCell = ({ indicator }) => {
    return (
        <td className="table-cell--text">
            { indicator.means_of_verification }
        </td>
    );
}

const IndicatorCells = ({ indicators, ontology }) => {
    return (
                indicators.map((indicator, idx) => {
                    return (
                        <tr key={ idx }>
                            <IndicatorCell indicator={ indicator } ontology={ ontology } key={ `ind${idx}` } />
                            <MeansCell indicator={ indicator } key={ `means${idx}` } />
                        </tr>
                    );
                })

        );
}

const AssumptionsCell = ({ assumptions, rowCount }) => {
    return <td className="table-cell" rowSpan={ rowCount }>{ assumptions }</td>
}


const LevelSet = ({ level }) => {
    const firstIndicator = level.indicators[0];
    const otherIndicators = level.indicators.slice(1);
    const rowCount  = level.indicators.length;
    return (
        <tbody>
            <tr>
                <LevelNameCell name={ level.display_name } rowCount={ rowCount } />
                <IndicatorCell indicator={ firstIndicator } ontology={ level.ontology } />
                <MeansCell indicator={ firstIndicator } />
                <AssumptionsCell assumptions={ level.assumptions } rowCount={ rowCount } />
            </tr>
            { otherIndicators.map((indicator, idx) => {
                return (
                    <tr key={ idx } >
                        <IndicatorCell indicator={ indicator } ontology={ level.ontology } key={ `ind${idx}` } />
                        <MeansCell indicator={ indicator } key={ `means${idx}` } />
                    </tr>
                )
            })}
        </tbody>
    )
}


@inject('dataStore', 'filterStore')
@observer
class LogframeTable extends React.Component {
    constructor(props) {
        super(props);
    }

    @computed
    get levels() {
        if (this.props.dataStore.results_framework) {
            return this.props.dataStore.getLevelsGroupedBy(this.props.filterStore.groupBy)
        }
        return [];
    }

    @computed
    get unassignedLevel() {
        if (this.props.dataStore.unassignedIndicators.length > 0) {
            return {
                display_name: gettext('Indicators unassigned to  a results framework level'),
                indicators: this.props.dataStore.unassignedIndicators,
                ontology: false,
                assumptions: null
            };
        }
        return false;
    }

    render() {
        return (
            <React.Fragment>
                <HeaderRow headers={ this.props.filterStore.headerColumns } />
                { this.levels.map((level, idx) => <LevelSet level={ level } key={ idx } />) }
                { this.unassignedLevel && <LevelSet level={ this.unassignedLevel } /> }
            </React.Fragment>
        );
    }
}

export default LogframeTable;
