import React from 'react';
import IPTTFilterForm from './filterForm';

const IPTTSidebar = () => {
    return (
        <div className="folding-sidebar">
            <div className="collapse width show folding-sidebar__contents" id="sidebar">
                <IPTTFilterForm />
            </div>
            <div className="folding-sidebar__trigger"
                data-target="#sidebar" data-toggle="collapse"
                    title={
                        /* # Translators: A toggle button that hides a sidebar of filter options */
                        gettext('Show/Hide Filters') }>
                <i className="fa fa-chevron-left"></i>
            </div>
        </div>
    );
}

export default IPTTSidebar;
