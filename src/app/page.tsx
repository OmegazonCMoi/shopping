'use client'

import {Button, Checkbox, TextField} from "ui";
import {IconPlus, IconTrash} from "justd-icons";
import {useEffect, useState} from "react";
import {Item} from "@/types/item";

export default function Home() {
    const [items, setItems] = useState<Item[]>([]);
    const [addInput, setAddInput] = useState('');

    function addItem() {
        const newItem: Item = { id: items.length, title: addInput, completed: false };
        setItems(prevItems => [...prevItems, newItem]);
        setAddInput('');
    }

    function removeItem(index: number) {
        if (items.length === 1) {
            setItems([]);
        } else {
            setItems(prevItems => prevItems.filter((_, i) => i !== index));
        }
    }

    function handleTaskInputChange(e: string) {
        setAddInput(e);
    }

    function handleCheckboxChange(index: number) {
        const newItems = items.map((item, i) => {
            if (i === index) {
                return { ...item, completed: !item.completed };
            }
            return item;
        });
        setItems(newItems);
    }

    useEffect(() => {
        const savedItems = localStorage.getItem("items");

        if (savedItems) {
            setItems(JSON.parse(savedItems));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items));
    }, [items]);


    return (
        <div className='max-w-sm mx-auto items-center justify-center min-h-screen flex flex-col'>
            <h1 className='text-[75px] mb-4' style={{ fontFamily: "Darlington" }}>Shopping List</h1>
            <div className='flex w-full'>
                <TextField
                    aria-label='Input Add Item'
                    className='mb-3 w-full'
                    placeholder='Add something to buy...'
                    value={addInput}
                    onChange={(e) => handleTaskInputChange(e)}
                    suffix={
                        <Button aria-label="New Item" intent="outline" onPress={() => addItem()}>
                            <IconPlus />
                        </Button>
                    }/>
            </div>
            <div id='list' className='flex flex-col w-full space-y-2'>
                {[...items]
                    .sort((a: any, b: any) => a.completed - b.completed)
                    .map((item) => (
                        <div className='px-1 py-1 rounded-xl border border-neutral-800 flex justify-between items-center' key={item.id}>
                            <div className='flex'>
                                <Checkbox className='ml-3' onChange={() => handleCheckboxChange(item.id)} isSelected={item.completed} />
                                <p className={`${item.completed ? "line-through text-gray-500" : ""} text-start mx-2`}>
                                    {item.title}
                                </p>
                            </div>
                            <Button aria-label='Delete Item' className='self-end' intent='outline' onPress={() => removeItem(item.id)}>
                                <IconTrash />
                            </Button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
