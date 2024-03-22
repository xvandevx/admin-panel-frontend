import MainLayout from "~/components/layouts/main";
import React, {useEffect, useMemo, useState} from 'react';
import Knowledges from "~/components/pages/infobloks/knowledges";


export default function Infobloks() {
    return (
        <MainLayout>
            <Knowledges/>
        </MainLayout>
    )
}
