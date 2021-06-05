import React, { Component } from 'react'
import "./Dashboard.css"
import PersistentDrawer from '../persistentDrawer/PersistentDrawer'
import service from '../../utils/service'

export default class Dashboard extends Component {

    componentDidMount(){
        const responseFromAPI = service.getDashboardRoot()
        console.log("response form backend API", responseFromAPI)
    }
    
    render() {
        return (
            <>
            <div id="dashboard-main">
                This is the dashboard!
                {/* <PersistentDrawer>

                </PersistentDrawer> */}
            </div>
            </>
        )
    }
}
