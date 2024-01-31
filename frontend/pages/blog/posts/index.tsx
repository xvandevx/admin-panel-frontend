import MainLayout from "~/components/layouts/main";
import React from 'react';
import Posts from "~/components/pages/blog/posts";


export default function PostsPage() {
    return (
        <MainLayout>
            <Posts />
        </MainLayout>
    )
}
