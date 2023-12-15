import MainLayout from "~/components/layouts/main";
import React, {useEffect, useMemo, useState} from 'react';
import Skills from "~/components/skills";


export default function Infobloks({id}: any) {

    return (
        <MainLayout>
            <Skills id={id}/>
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