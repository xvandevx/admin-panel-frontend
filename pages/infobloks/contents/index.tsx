import MainLayout from "~/components/layouts/main";
import React, {useEffect, useMemo, useState} from 'react';
import Pages from "~/components/pages";
import Contents from "~/components/contents";


export default function Infobloks() {
    return (
        <MainLayout>
            <Contents/>
        </MainLayout>
    )
}
