import MainLayout from "~/components/layouts/main";
import React, {useEffect, useMemo, useState} from 'react';
import Users from "~/components/users";


export default function UsersPage() {

    return (
        <MainLayout>
            <Users/>
        </MainLayout>
    )
}