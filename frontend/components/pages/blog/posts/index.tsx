import React, {useEffect, useMemo, useState} from 'react';
import {Api} from "~/api";
import InfoBlock, {FormEditFieldTypes} from "~/components/infoBlock";
import _ from "lodash";
import {PostFields} from "~/backendTypes/blog/post";
import {Tag} from "antd";
import dayjs from "dayjs";

export default function Posts() {
    const tableItems: string[] = [
        PostFields.isActive,
        PostFields.name,
        PostFields.image,
        PostFields.date,
        PostFields.views,
        PostFields.likes,
        PostFields.tags,
    ];


    const [tags, setTags] = useState([]);

    const getTags = async () => {
        const tags = await Api.blogTags.get();
        // @ts-ignore
        setTags(tags);
    }

    useEffect( () => {
        getTags();
    }, []);

    const dataTags = useMemo(() => {
        return tags?.map((item: any) => {
            return {
                label: item.name,
                value: item.id,
            }
        })
    }, [tags])

    const renderTableItems = {
        [PostFields.tags]: (_: any, { tags }: any) => (
            <>
                {tags?.map((tag: any) => {
                    return (
                        <Tag key={tag.id}>
                            {tag.name}
                        </Tag>
                    );
                })}
            </>
        ),
    };

    const editFormItems = [
        {
            name: PostFields.isActive,
            type: FormEditFieldTypes.boolean,
        },
        {
            name: PostFields.name,
            required: true,
            type: FormEditFieldTypes.string,
        },
        {
            name: PostFields.image,
            type: FormEditFieldTypes.string,
        },
        {
            name: PostFields.date,
            required: true,
            type: FormEditFieldTypes.date,
        },
        {
            name: PostFields.tagIds,
            type: FormEditFieldTypes.select,
            mode: 'multiple',
            options: dataTags
        },
        {
            name: PostFields.text,
            required: true,
            type: FormEditFieldTypes.string,
        },
        {
            name: PostFields.views,
            required: true,
            type: FormEditFieldTypes.string,
        },
        {
            name: PostFields.likes,
            required: true,
            type: FormEditFieldTypes.string,
        },
    ]

    return (
        <InfoBlock
            tableItems={tableItems}
            getTableItems={Api.blogPosts.get}
            deleteTableItem={Api.blogPosts.delete}
            updateItem={Api.blogPosts.update}
            addItem={Api.blogPosts.add}
            prepareFormFields={(record: any) => {
                const data =  _.cloneDeep(record)
                data.date = data.date ? dayjs(data.date) : ''
                data.tagIds = data.tags?.map(({id}: any) => id);
                return data
            }}
            editFormItems={editFormItems}
            renderTableItems={renderTableItems}
        />
    )
}
