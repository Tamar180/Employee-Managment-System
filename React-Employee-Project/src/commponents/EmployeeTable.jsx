import React, { createContext, useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { observer } from 'mobx-react';
import { Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import employee from '../data/employee';
import EmployeeForm from './EmployeeForm';
import AddIcon from '@mui/icons-material/Add';
import Swal from 'sweetalert2';

export const EmployeeContext = createContext(null);

const EmployeeTable = observer(() => {
    const [refreshKey, setRefreshKey] = useState(0);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState({});
    const employeeContext = { selectedEmployee, setSelectedEmployee }

    const handleEditEmployee = (employeeId) => {
        setRefreshKey(prevKey => prevKey + 1);
        const editEmployee = employee.employeeList.find(employee => employee.employeeId === employeeId);
        setSelectedEmployee(editEmployee);
        setOpenEditDialog(true);
    };

    const handleDeleteEmployee = (Id) => {
        const deleteEmployee = employee.employeeList.find(employee => employee.employeeId === Id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                employee.deleteEmployee(deleteEmployee.id);
                Swal.fire(
                    "Deleted!",
                    "The employee has been deleted.",
                    "success"
                );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    "Cancelled",
                    "The employee is safe :)",
                    "error"
                );
            }
        });
    };
    const handleAddEmployee = () => {
        setRefreshKey(prevKey => prevKey + 1);
        setSelectedEmployee({});
        setOpenEditDialog(true);
    };
    const columns = [
        {
            name: 'firstName',
            label: 'First Name',
        },
        {
            name: 'lastName',
            label: 'Last Name',
        },
        {
            name: 'employeeId',
            label: 'Employee Id',
        },
        {
            name: 'startDate',
            label: 'Start Date',
            options: {
                customBodyRender: (date) => new Date(date).toLocaleDateString(),
            },
        },
        {
            name: 'actions',
            label: 'Actions',
            options: {
                customBodyRender: (value, tableMeta) => (
                    <Box sx={{ display: 'flex', gap: '1rem' }}>
                        <Tooltip title="Edit">
                            <IconButton onClick={() => handleEditEmployee(tableMeta.rowData[2])}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton onClick={() => handleDeleteEmployee(tableMeta.rowData[2])}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                ),
            },
        },
    ];

    const data = employee.employeeList;

    const options = {
        filter: true,
        onFilterChange: (changedColumn, filterList) => {
            console.log(changedColumn, filterList);
        },
        selectableRows: 'none',
        filterType: 'dropdown',
        responsive: 'standard',
        rowsPerPage: 10,
        expandableRows: false,
        stickyHeader: true,
        fixedHeader: true,
        customToolbar: () => {
            return (
                <Tooltip title="Add new employee">
                    <IconButton onClick={handleAddEmployee}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            );
        },
    };

    return (
        <>
            <MUIDataTable
                title={'Employee list'}
                data={data}
                columns={columns}
                options={options}
            />
            <EmployeeContext.Provider value={employeeContext}>
                <EmployeeForm key={refreshKey}
                    openEditDialog={openEditDialog} setOpenEditDialog={setOpenEditDialog} />
            </EmployeeContext.Provider>

        </>
    );
});

export default EmployeeTable;



