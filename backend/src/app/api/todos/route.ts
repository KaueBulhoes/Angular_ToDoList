import client from '../../../../prisma/client';
import { Todo } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
	const newTodo: Todo = await request.json();
	const createdTodo: Todo = await client.todo.create({
		data: newTodo,
	});

	return new NextResponse(JSON.stringify(createdTodo), {
		status: 201,
		statusText: 'Created',
	});
}

export async function GET() {
	const todos: Todo[] = await client.todo.findMany();

	return new NextResponse(JSON.stringify(todos), {
		status: 200,
		statusText: 'OK',
	});
}