import MainLayout from "~/components/layouts/main";
import React, {useEffect, useMemo, useState} from 'react';
import Pages from "~/components/pages";


export default function Infobloks({id}: any) {

    return (
        <MainLayout>
            <Pages id={id}/>
        </MainLayout>
    )
}

export const getServerSideProps = ({query}: any)  => {
    return {
        props: {
            id: Number(query.id)
        }
    }
};