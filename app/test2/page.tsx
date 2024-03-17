'use client'
import { Grid, Button } from '@mui/material';
import { useState, useEffect } from 'react';
const axios = require('axios')
const _ = require("lodash");

export default function Test2() {
    const [listData, setListData] = useState([]);

    const initData = () => {
        axios.get('https://dummyjson.com/users').then((res: any) => {
            if (res && res.data.users) {
                const groupedData = _.chain(res.data.users)
                    .groupBy('company.department')
                    .mapValues((usersInDepartment: any) => {
                        const genderCounts = _.countBy(usersInDepartment, 'gender');
                        const groupedDataHair = _.chain(usersInDepartment)
                            .groupBy('hair')
                            .mapValues((usersInHair: any) => {
                                const hairInfo = _.map(usersInHair, 'hair');
                                return {
                                    hairInfo,
                                };
                            })
                            .value();
                        const userAddressInfo = _.map(usersInDepartment, (user:any) => {
                            const fullName = `${user.firstName} ${user.lastName}`;
                            return {
                                fullName,
                                postalCode: user.address.postalCode
                            };
                        });
                        const minAge = _.minBy(usersInDepartment, 'age').age;
                        const maxAge = _.maxBy(usersInDepartment, 'age').age;
                        const ageRange = `${minAge} - ${maxAge}`

                        const totalHeight = _.sumBy(usersInDepartment, 'height');
                        const averageHeight = totalHeight / usersInDepartment.length;

                        const totalWeight = _.sumBy(usersInDepartment, 'weight');
                        const averageWeight = totalWeight / usersInDepartment.length;

                        return {
                            totalUsers: usersInDepartment.length,
                            genderCounts,
                            ageRange,
                            averageWeight,
                            averageHeight,
                            hairStyle: groupedDataHair,
                            userAddressInfo
                        };
                    })
                    .value();

                console.log(groupedData);
            }
            setListData(res?.data)
        }).catch((err: any) => {
            console.log('err:', err)
        })
    }
    useEffect(() => {
        initData()
    }, [])

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    Please open log
                </Grid>
            </Grid>
        </main>
    );
}
