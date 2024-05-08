import client from '../../../../lib/prisma/client';
import { Todo } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextResponse, NextRequest } from 'next/server';

type FindById = {
	id: string;
};

export async function GET(request: NextRequest, context: { params: FindById }) {
	try {
		const todo: Todo = await client.todo.findUniqueOrThrow({
			where: {
				id: String(context.params.id),
			},
		});

		return new NextResponse(JSON.stringify(todo), {
			status: 200,
			statusText: 'OK',
		});
	} catch (error) {
		const msgError = (error as PrismaClientKnownRequestError).message;

		return new NextResponse(JSON.stringify({ message: msgError }), {
			status: 404,
			statusText: 'Not Found',
		});
	}
}

export async function PUT(request: NextRequest, context: { params: FindById }) {
	const newTodoData: Todo = await request.json();

	try {
		const updatedTodo: Todo = await client.todo.update({
			where: {
				id: String(context.params.id),
			},
			data: newTodoData,
		});

		return new NextResponse(JSON.stringify(updatedTodo), {
			status: 200,
			statusText: 'OK',
		});
	} catch (error) {
		const msgError = (error as PrismaClientKnownRequestError).meta?.cause;

		return new NextResponse(JSON.stringify({ message: msgError }), {
			status: 404,
			statusText: 'Not Found',
		});
	}
}

export async function DELETE(
	request: NextRequest,
	context: { params: FindById }
) {
	try {
		await client.todo.delete({
			where: {
				id: String(context.params.id),
			},
		});

		return new NextResponse(null, {
			status: 204,
			statusText: 'No Content',
		});
	} catch (error) {
		const msgError = (error as PrismaClientKnownRequestError).meta?.cause;

		return new NextResponse(JSON.stringify({ message: msgError }), {
			status: 404,
			statusText: 'Not Found',
		});
	}
}