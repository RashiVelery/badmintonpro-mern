import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import API from '../services/api'
import '../style/userList.css'

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await API.get('/auth/users');
                setUsers(res.data);
            } catch (error) {
                console.log(err);
            }
        };
        getUsers();
    }, []);

    const toggleStatus = async (id) => {
        try {
            await API.patch(`auth/users/toggle-status/${id}`);
            setUsers(users.map(u => u._id === id ? { ...u, isActive: !u.isActive } : u));
        } catch (error) {
            alert('Action failed');
        }
    }

    return (
        <div className='user-list-container'>
            <h2>Registered Users</h2>
            <table className='user-table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <span className={`role-badge role-${user.role}`}>
                                    {user.role}
                                </span>
                            </td>
                            <td>
                                <button
                                    onClick={() => toggleStatus(user._id)}
                                    style={{ backgroundColor: user.isActive ? '#ffa500' : '#4CAF50', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                                >
                                    {user.isActive ? 'Block' : 'Unblock'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserList
