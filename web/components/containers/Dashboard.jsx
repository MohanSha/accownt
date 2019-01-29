import React from 'react';

// Components
import DeveloperDashboard from 'components/dashboard/developer/DeveloperDashboard';
import UserDashboard from 'components/user/UserDashboard';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    switch (this.props.path[2]) {
      case 'user':
        return <UserDashboard {...this.props} />;
      case 'developer':
        return <DeveloperDashboard {...this.props} />;
    }
  }
}