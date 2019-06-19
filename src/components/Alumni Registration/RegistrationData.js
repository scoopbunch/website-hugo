import React, {Component} from 'react';
import * as _ from "lodash";
import {connect} from "react-redux";
import {Button, Input, Table} from "antd";
import {Programme, Branch} from 'Constants/ProgrammeAndBranch';
import {
    alumniDataList,
    alumniDataSearch,
    confirmRegistration
} from "actions/newAlumniAction";
import NewAlumniView from "components/Alumni Registration/NewAlumniView";


class AlumniData extends Component {
    constructor(props) {
        super(props);
        this.props.getDataList();
        this.columns = [
            {title: 'Name', dataIndex: 'name', sorter: (a, b) => this.shorting(a, b, 'name'),},
            {title: 'Email', dataIndex: 'email', sorter: (a, b) => this.shorting(a, b, 'email'),},
            {title: 'Mobile', dataIndex: 'mobile',},
            {
                title: 'Programme',
                dataIndex: 'programme',
                filters: [...Programme, {text: 'None', value: 'NONE'}],
                onFilter: (a, b) => this.filter(a, b, 'programme'),
                sorter: (a, b) => this.shorting(a, b, 'programme'),
            },
            // {
            //     title: 'Branch',
            //     dataIndex: 'branch',
            //     filters: [...Branch, {text: 'None', value: 'NONE'}],
            //     onFilter: (a, b) => this.filter(a, b, 'branch'),
            //     sorter: (a, b) => this.shorting(a, b, 'branch'),
            // },
            {
                title: 'Batch',
                dataIndex: 'batch',
                sorter: (a, b) => a.batch - b.batch,
            },
            {
                title: 'Registration date',
                dataIndex: 'created_at',
                sorter: (a, b) => this.shorting(a, b, 'created_at'),
            },
            // {
            //     title: 'Passing Year',
            //     dataIndex: 'passing',
            //     sorter: (a, b) => a.passing - b.passing,
            // },
            {
                title: 'Action',
                dataIndex: 'id',
                render: (id, record) => <Button type="link" size={"small"}
                                                onClick={() => this.props.onView(record.id)}>View</Button>

            },
        ];
    }

    shorting = (a, b, name) => {
        if (!a[name]) return 1;
        return a[name].localeCompare(b[name])
    };

    filter = (value, record, column) => {
        if (!record[column]) return value === 'NONE' ? true : null;
        return record[column].indexOf(value) === 0
    };


    render() {
        const {alumni, data, onView, startSearch, onConfirm} = this.props;
        return (
            <>
                <Input.Search
                    style={{maxWidth: 300, marginBottom: 8}}
                    // onKeyUpCapture={this.props.startSearch}
                    onChange={startSearch}
                    onPressEnter={startSearch}
                    placeholder="Search"
                    allowClear
                />
                <Button
                    shape="circle" icon="reload"
                    style={{float: 'right'}}
                    onClick={this.props.getDataList}
                    size={"small"}
                />
                <NewAlumniView data={_.pickBy(alumni)} onClose={onView} onConfirm={onConfirm}/>
                <Table
                    style={{overflow: 'overlay'}}
                    size={"middle"}
                    rowKey="id"
                    columns={this.columns}
                    dataSource={data}
                />
            </>
        );
    }
}

const mapStateToProps = ({newAlumni}) => ({
    data: newAlumni.data,
    alumni: newAlumni.alumni,
});

const mapDispatchToProps = (dispatch) => ({
    getDataList: () => dispatch(alumniDataList()),
    startSearch: e => dispatch(alumniDataSearch(e)),
    onConfirm: () => dispatch(confirmRegistration()),
    onView: key => dispatch({type: 'NEW_ALUMNI_VIEW', payload: key}),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlumniData);