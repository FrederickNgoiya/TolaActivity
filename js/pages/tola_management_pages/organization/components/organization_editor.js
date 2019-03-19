import React from 'react'
import { observer } from "mobx-react"

@observer
export default class OrganizationEditor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active_page: 'profile'
        }
    }

    updateActivePage(new_page) {
        if(!this.props.new) {
            this.setState({active_page: new_page})
        }
    }

    render() {
        const {ProfileSection, HistorySection} = this.props

        const profile_active_class = (this.state.active_page == 'profile')?'active':''
        const history_active_class = (this.state.active_page == 'status_and_history')?'active':''
        const new_class = (this.props.new)?'disabled':''

        return (
            <div className="user-editor tab-set--vertical">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a href="#" className={`nav-link ${profile_active_class}`}
                            onClick={(e) => { e.preventDefault(); this.updateActivePage('profile')}}>
                            {gettext("Profile")}
                        </a>
                        <a href="#" className={`nav-link ${history_active_class}`}
                            onClick={(e) => { e.preventDefault(); this.updateActivePage('status_and_history')}}>
                            {gettext("Status and History")}
                        </a>
                    </li>
                </ul>
                <div className="tab-content">
                    {this.state.active_page == 'profile' &&
                    <ProfileSection />
                    }

                    {this.state.active_page == 'status_and_history' &&
                    <HistorySection />
                    }
                </div>
            </div>
        )
    }
}
