import React from 'react';
import { inject } from 'mobx-react';

const ExcelButton = inject('filterStore')(
    ({ filterStore }) => {
        const clickHandler = filterStore.excelUrl ?
            () => { window.open(filterStore.excelUrl, '_blank') } :
            (e) => { e.preventDefault(); };
        return (
            <button type="button"
                    className="btn btn-sm btn-secondary"
                    onClick={ clickHandler }
                    disabled={ !filterStore.excelUrl }>
                <i className="fas fa-download"></i> Excel
            </button>
        );
    }
);

const TitleBar = inject('dataStore')(
    ({ dataStore }) => {
        return (
        <React.Fragment>
            <div className="logframe--header">
                <h1 className="page-title h2">
                    <a href={ dataStore.program_page_url }>{ dataStore.name }:</a>
                    &nbsp;
                    <span className="font-weight-normal text-muted text-nowrap">
                        {
                            // # Translators: short for "Logistical Framework"
                            gettext('Logframe')
                        }
                        &nbsp;
                        <small><i className="fas fa-table"></i></small>
                    </span>
                </h1>
            </div>
            <ExcelButton />
        </React.Fragment>
        );
    }
)

export default TitleBar;
