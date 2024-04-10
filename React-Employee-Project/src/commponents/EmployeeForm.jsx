import { observer } from "mobx-react";
import React, { useEffect, useState } from 'react';
import { Button, TextField, Dialog, DialogContent, DialogActions, Checkbox, FormControlLabel, MenuItem, Select, Grid, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import Input from '@mui/joy/Input';
import FormLabel from '@mui/joy/FormLabel';
import FormControl from '@mui/joy/FormControl';
import PersonIcon from '@mui/icons-material/Person';
import { EmployeeContext } from "./EmployeeTable";
import { useContext } from "react";
import employee from "../data/employee";
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { useFieldArray } from 'react-hook-form';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';

const genders = [
    { value: 'male', label: 'male' },
    { value: 'female', label: 'female' },
];
const roles = ['role1', 'role2', 'role3', 'role4', 'role5',
    'role6', 'role7', 'role8', 'role9', 'role10', 'role11', 'role12'
];
const EmployeeForm = observer(({ openEditDialog, setOpenEditDialog }) => {

    const selectedEmployee = useContext(EmployeeContext).selectedEmployee;
    const { register, handleSubmit, control, setValue, getValues, reset } = useForm();
    const [correctName, setCorrectName] = useState(true);
    const { fields, append, remove } = useFieldArray({
        control,
        name: "roles"
    });
    useEffect(() => {
        setValue('firstName', selectedEmployee?.firstName || '');
        setValue('lastName', selectedEmployee?.lastName || '');
        setValue('startDate', selectedEmployee?.startDate || '');
        setValue('employeeId', selectedEmployee?.employeeId || '');
        setValue('birthDate', selectedEmployee?.birthDate || '');
        setValue('roles', selectedEmployee?.roles || []);
    }, [selectedEmployee, setValue])


    const dubbleFieldRoleNames = () => {
        const seenRoleNames = new Set();
        let flag = false;
        fields?.forEach((r, i) => {
            if (seenRoleNames.has(getValues(`roleName${i}`))) {
                flag = true;
            } else {
                seenRoleNames.add(getValues(`roleName${i}`));
            }
        });
        if (flag)
            return false;
        else return true;
    };
    const onSubmit = (data) => {
        if (!dubbleFieldRoleNames())
            setCorrectName(false);
        else {
            const cleanRoleList = fields.map((field, index) => ({
                roleName: parseInt(getValues(`roleName${index}`)),
                startDate: getValues(`startDate${index}`),
                managerial: getValues(`managerial${index}`)
            }));
            const employeeFromForm = {
                "employeeId": data.employeeId,
                "firstName": data.firstName,
                "lastName": data.lastName,
                "startDate": data.startDate,
                "birthDate": data.birthDate,
                "gender": data.gender == "male" ? 0 : 1,
                "roles": cleanRoleList,
                "status": data.status
            }
            if (Object.keys(selectedEmployee).length === 0 && selectedEmployee.constructor === Object) {
                employee.postEmployee(employeeFromForm);
            } else {
                employee.putEmployee(selectedEmployee.id, employeeFromForm);
            }
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
            });
            setOpenEditDialog(false);
        }
    };

    return (
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card
                        variant="outlined"
                        sx={{
                            maxHeight: 'max-content',
                            maxWidth: '100%',
                            mx: 'auto',
                            overflow: 'auto',
                            resize: 'horizontal',
                        }}
                    >
                        <Typography level="title-lg" startDecorator={<InfoOutlined />}>
                            Fill the employee details
                        </Typography>
                        <Divider inset="none" />
                        <CardContent
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
                                gap: 1.5,
                            }}
                        >
                            <FormControl >
                                <FormLabel>First Name</FormLabel>
                                <Input
                                    endDecorator={<PersonIcon />}
                                    defaultValue={selectedEmployee.firstName}
                                    {...register("firstName")}
                                    required
                                />
                            </FormControl>
                            <FormControl >
                                <FormLabel>Last Name</FormLabel>
                                <Input
                                    endDecorator={<PersonIcon />}
                                    defaultValue={selectedEmployee.lastName}
                                    {...register("lastName")}
                                    required
                                />
                            </FormControl>
                            <FormControl >
                                <FormLabel>Employee Id</FormLabel>
                                <Input
                                    type="number"
                                    defaultValue={selectedEmployee.employeeId}
                                    {...register("employeeId")}
                                    required
                                />
                            </FormControl>
                            <FormControl >
                                <FormLabel>Birth Date</FormLabel>
                                <Input
                                    type="datetime-local"
                                    defaultValue={selectedEmployee.birthDate}
                                    {...register("birthDate")}
                                    required
                                />
                            </FormControl>
                            <FormControl >
                                <FormLabel>Start Date</FormLabel>
                                <Input
                                    type="datetime-local"
                                    defaultValue={selectedEmployee.startDate}
                                    {...register("startDate")}
                                    required
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Gender</FormLabel>
                                <Select
                                    {...register("gender")}
                                    defaultValue={JSON.stringify(selectedEmployee.gender) === "0" ? 'male' : 'female'}
                                    required
                                >
                                    {genders.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl >
                                <FormLabel>Status</FormLabel>
                                <FormControlLabel
                                    control={<Checkbox
                                        defaultChecked
                                        {...register("status")} />}
                                    label="Active"
                                />
                            </FormControl>

                        </CardContent>
                        <CardContent>
                            <Typography level="title-lg" >
                                Fill the employee roles
                            </Typography>
                            <Grid container spacing={2}>
                                {fields.map((field, index) => (
                                    <Grid item xs={6} key={index}>
                                        <Card variant="outlined">
                                            <CardContent>
                                                <FormControl>
                                                    <FormLabel>Role Nmae</FormLabel>
                                                    <Select
                                                        {...register(`roleName${index}`)}
                                                        defaultValue={field?.roleName ?? ''}
                                                        required
                                                        suppressHydrationWarning
                                                    >
                                                        {roles.map((role, i) => (
                                                            <MenuItem key={i} value={i}>
                                                                {role}
                                                            </MenuItem>
                                                        ))}</Select>
                                                </FormControl>
                                                <FormControl>
                                                    <FormLabel>Start Date</FormLabel>
                                                    <TextField
                                                        type="date"
                                                        defaultValue={field?.startDate ? new Date(field.startDate).toLocaleDateString('en-CA') : ''}
                                                        InputProps={{
                                                            inputProps: { min: selectedEmployee ? new Date(selectedEmployee.startDate).toLocaleDateString('en-CA') : '' }
                                                        }}
                                                        {...register(`startDate${index}`)}
                                                        required
                                                    />
                                                </FormControl>
                                                <FormControl >
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                defaultChecked={field?.managerial}
                                                                {...register(`managerial${index}`)}
                                                            />
                                                        }
                                                        label="Management"
                                                    />
                                                </FormControl>
                                                <IconButton aria-label="delete" onClick={() => remove(index)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                        {!correctName && (
                            <Alert severity="error" sx={{ marginBottom: 2 }}>
                                Duplicate role names found
                            </Alert>)}
                    </Card>
                    <Button variant='contained' color='primary' type='button' onClick={() => append({})}
                        sx={{ marginTop: "2em" }}>
                        Add Role
                    </Button>
                    <DialogActions>
                        <Button onClick={() => { setOpenEditDialog(false) }} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    )
})
export default EmployeeForm;
