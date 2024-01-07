import MainLayout from "~/components/layouts/main";
import React, {useEffect, useMemo, useState} from 'react';
import Roles from "~/components/roles";


export default function RolesPage() {
    return (
        <MainLayout>
            <Roles/>
        </MainLayout>
    )
}
