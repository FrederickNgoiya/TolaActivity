
/**
 * IPTT Constants:
 */
const BLANK_LABEL = '---------';
const BLANK_OPTION = {
    value: null,
    label: BLANK_LABEL
};
const BLANK_TABLE_CELL = '—';


const TVA = 1;
const TIMEPERIODS = 2;

const TIME_AWARE_FREQUENCIES = [3, 4, 5, 6, 7];

export { BLANK_OPTION, BLANK_LABEL, BLANK_TABLE_CELL, TVA, TIMEPERIODS, TIME_AWARE_FREQUENCIES };

const GROUP_BY_CHAIN = 1;
const GROUP_BY_LEVEL = 2;

export { GROUP_BY_CHAIN, GROUP_BY_LEVEL };

const _gettext = (typeof gettext !== 'undefined') ?  gettext : (s) => s;

function getPeriodLabels() {
    return {
        targetperiodLabels: {
            1: _gettext("Life of Program (LoP) only"),
            3: _gettext("Annual"),
            2: _gettext("Midline and endline"),
            5: _gettext("Tri-annual"),
            4: _gettext("Semi-annual"),
            7: _gettext("Monthly"),
            6: _gettext("Quarterly")
        },
        timeperiodLabels: {
            3: _gettext("Years"),
            5: _gettext("Tri-annual periods"),
            4: _gettext("Semi-annual periods"),
            7: _gettext("Months"),
            6: _gettext("Quarters")
        }
    };
}

export {getPeriodLabels};

export const STATUS_CODES = {
    NO_INDICATOR_IN_UPDATE: 1
};