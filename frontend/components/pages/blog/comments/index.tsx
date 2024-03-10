import React, {useEffect, useMemo, useState} from 'react';
import {Api} from "~/api";
import InfoBlock, {FormEditFieldTypes} from "~/components/infoBlock";
import _ from "lodash";
import {CommentFields} from "~/backendTypes/blog/comment";
import {Tag} from "antd";

export default function Comments() {
    const tableItems: CommentFields[] = [
        CommentFields.postId,
        CommentFields.isActive,
        CommentFields.authorName,
        CommentFields.text
    ];

    const [posts, setPosts] = useState([]);

    const getSkills = async () => {
        const posts = await Api.blogPosts.get();
        // @ts-ignore
        setPosts(posts);
    }

    useEffect( () => {
        getSkills();
    }, []);

    const dataPosts = useMemo(() => {
        return posts.map((item: any) => {
            return {
                label: item.name,
                value: item.id,
            }
        })
    }, [posts])

    const editFormItems = [
        {
            name: CommentFields.isActive,
            type: FormEditFieldTypes.boolean,
        },
        {
            name: CommentFields.postId,
            required: true,
            type: FormEditFieldTypes.select,
            options: dataPosts
        },
        {
            name: CommentFields.authorName,
            required: true,
            type: FormEditFieldTypes.string,
        },
        {
            name: CommentFields.text,
            required: true,
            type: FormEditFieldTypes.textarea,
        },
        {
            name: CommentFields.likes,
            required: true,
            type: FormEditFieldTypes.string,
        },
    ]

    const renderTableItems = {
        [CommentFields.postId]: (_: any, { post }: any) => (
            <Tag key={post.id}>
                {post.name}
            </Tag>
        ),
    };

    return (
        <InfoBlock
            tableItems={tableItems}
            getTableItems={Api.blogComments.get}
            deleteTableItem={Api.blogComments.delete}
            updateItem={Api.blogComments.update}
            addItem={Api.blogComments.add}
            prepareFormFields={(record: any) => {
                const data =  _.cloneDeep(record)
                return data
            }}
            editFormItems={editFormItems}
            renderTableItems={renderTableItems}
        />
    )
}
