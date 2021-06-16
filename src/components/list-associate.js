import React, {Component} from 'react';
import _ from "lodash";
import data from './sample-data.json'
import './styles.scss'
import {HTTP} from "../service/core/http.service";
import {urls} from "../config/urlConfig";

export class ListAssociate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            associateList: data.associateList
        }
    }

    deleteAssociate = async (id) => {
        const result = window.confirm('Are you sure to delete this user');
        if (result === false) return

        try {
            await HTTP(urls.delete + id)
        } catch (e) {
            alert('Unable to delete this user');
        }
    }

    getAssociateList = async () => {
        try {
            const result = await HTTP.get(urls.list);
            const list = result.data.list;
            if (list) {
                this.setState({
                    associateList: list
                })
            }
        } catch (e) {
            alert('Unable to get user list');
        }
    }

    updateAssociate = (id) => {
        this.props.history.push('/update-associate/' + id)
    }

    handleAddAssociate = () => {
        this.props.history.push('/add-associate')
    }

    componentDidMount() {
        this.getAssociateList()
    }

    render() {
        const {associateList} = this.state;

        return <div className={'container associate-list-main'}>
            <div className="row">
                <button className={'btn btn-primary'} onClick={this.handleAddAssociate}>Add Associate</button>
            </div>

            <div className="row mt-3">
                {_.isEmpty(associateList)
                    ? <div>
                        <p>No user added yet!</p>
                    </div>
                    : <table className={'w-100'}>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            associateList.map(({id, name, phone, address}) => {
                                return <tr className={'p-2'} key={id}>
                                    <td>{name}</td>
                                    <td>{phone}</td>
                                    <td>{address}</td>
                                    <td>
                                        <span onClick={() => this.deleteAssociate(id)} className={'link'}>Delete</span>
                                        <span className={'ml-2 link'} onClick={() => this.updateAssociate(id)}>Update</span>
                                    </td>
                                </tr>
                            })
                        }
                        </tbody>

                    </table>}
            </div>
        </div>

    }
}
