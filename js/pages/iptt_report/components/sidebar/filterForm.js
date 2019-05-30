import React from 'react';
import { inject, observer } from 'mobx-react';
import * as Selectors from './reportSelect';
import * as Filters from './reportFilter';
import { IPTTButton } from './buttons';


const FilterTop = inject('filterStore')(
    observer(({ filterStore }) => {
        return (
            <React.Fragment>
                <Selectors.ProgramSelect />
                <Selectors.FrequencySelect />
                <Selectors.TimeframeRadio />
                <Selectors.StartDateSelect />
                <Selectors.EndDateSelect />
                { filterStore.oldLevels === false &&
                    <Selectors.GroupingSelect />
                }
            </React.Fragment>
        );
    })
);

const FilterMiddle = () => {
    return (
        <React.Fragment>
            <Filters.LevelSelect />
            <Filters.SiteSelect />
            <Filters.TypeSelect />
            <Filters.SectorSelect />
            <Filters.IndicatorSelect />
        </React.Fragment>
    );
}

const IPTTFilterForm = inject('filterStore')(
    observer(({ filterStore }) => {
        return (
            <nav id="id_iptt_report_filter">
                <div className="filter-section">
                    <h3 className="filter-title">
                        {
                        /* # Translators: Labels a set of filters to select which data to show */
                         gettext('Report Options') }
                    </h3>
                    <FilterTop />
                </div>
                <div className="filter-section filter-section--lighter">
                    <FilterMiddle />
                </div>
                <div
                     className="filter-section filter-buttons">
                    <IPTTButton
                        label={
                            /* # Translators: clears all filters set on a report */
                            gettext('Clear')
                        }
                        action={ filterStore.clearFilters }
                        isDisabled={ filterStore.noFilters }
                    />
              </div>
            </nav>
        );
    })
);

export default IPTTFilterForm;
