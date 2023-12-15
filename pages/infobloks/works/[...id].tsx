import MainLayout from "~/components/layouts/main";
import React, {useEffect, useMemo, useState} from 'react';
import Works from "~/components/works";


export default function Infobloks({id}: any) {

    return (
        <MainLayout>
            <Works id={id}/>
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