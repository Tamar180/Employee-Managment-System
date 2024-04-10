import { observable, action, makeObservable, runInAction } from "mobx";
import axios from "axios";

class Employee {
    employeeList = [];
    constructor() {
        makeObservable(this, {
            employeeList: observable,
            getEmployeeList: action,
            getEmployeeById: action,
            postEmployee: action,
            putEmployee: action,
            deleteEmployee: action
        });
        this.getEmployeeList();
    }

    getEmployeeList() {
        axios.get("https://localhost:7038/api/Employee").then((res) => {
            runInAction(() => {
                this.employeeList = res.data;
            })
        }).catch((error) => {
            console.log(error);
        });

    }
    getEmployeeById(id) {
        axios.get(`https://localhost:7038/api/Employee/${id}`).then((res) => {
            runInAction(() => {
                console.log(JSON.stringify(res.data));
            })
        }).catch((error) => {
            console.log(error);
        });
    }
    postEmployee(employee) {
        return new Promise((resolve, reject) => {
            axios.post("https://localhost:7038/api/Employee", employee).then((res) => {
                runInAction(() => {
                    this.employeeList=[...this.employeeList,res.data];
                });
                resolve(res.status);
            }).catch((error) => {
                console.error("Error adding employee:", error);
                reject(error);
            });
        });
    }
    putEmployee(id, employee) {
        return new Promise((resolve, reject) => {
            axios.put(`https://localhost:7038/api/Employee/${id}`, employee).then((res) => {
                runInAction(() => {
                    const index = this.employeeList.findIndex(employee => employee.id === id);
                    if (index !== -1) {
                        this.employeeList[index] = res.data;
                        this.employeeList=[...this.employeeList];
                    }
                });
                resolve(res.status);
            })
                .catch((error) => {
                    console.error("Error updating employee:", error);
                    reject(error);
                });
        });
    }
    deleteEmployee(id) {
        return new Promise((resolve, reject) => {
            axios.delete(`https://localhost:7038/api/Employee/${id}`)
            .then(() => {
                runInAction(() => {
                    this.employeeList = this.employeeList.filter(employee => employee.id !== id);
                });
                resolve();
            })
            .catch((error) => {
                console.error("Error deleting employee:", error);
                reject(error);
            });
        });
    }
}
export default new Employee();
//
// function getEmployeeList() {
//     return new Promise((resolve, reject) => {
//         axios.get("https://localhost:7237/api/Employee")
//             .then((res) => {
//                 runInAction(() => {
//                     this.employeeList = JSON.stringify(res.data);
//                 });
//                 console.log(this.employeeList);
//                 resolve(JSON.stringify(res.data));
//             })
//             .catch((error) => {
//                 console.log(error);
//                 reject(error);
//             });
//     });
// }
//
// function getEmployeeById(id) {
//     return new Promise((resolve, reject) => {
//         axios.get(`https://localhost:7237/api/Employee/${id}`)
//             .then((res) => {
//                 runInAction(() => {
//                     console.log(JSON.stringify(res.data));
//                 });
//                 resolve(JSON.stringify(res.data));
//             })
//             .catch((error) => {
//                 console.log(error);
//                 reject(error);
//             });
//     });
// }