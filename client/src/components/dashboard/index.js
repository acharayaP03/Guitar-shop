import React from 'react';
import DashboardLayouts from 'hoc/dashboard.layouts';

const UserDashboard = ({ users }) => {
    return (
        <DashboardLayouts title="Overview">
            <div className="user_nfo_panel">
                <div>
                    <span>{users.data.firstname}</span>
                    <span>{users.data.lastname}</span>
                    <span>{users.data.email}</span>
                </div>
                {users.data.history ? (
                    <div
                        style={{
                            marginTop: '40px',
                        }}
                    >
                        <h1>History of purchases</h1>
                        <div className="user_product_block_wrapper">
                            history
                        </div>
                    </div>
                ) : null}
            </div>
        </DashboardLayouts>
    );
};

export default UserDashboard;
