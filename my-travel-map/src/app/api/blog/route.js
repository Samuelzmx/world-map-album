import { NextResponse } from "next/server";
import {
   initializeDb,
   getAllBlog,
   addBlog,
   updateBlog,
   getBlogById,
   deleteBlog
} from "@/database/database";

// In the future, this function will be getAllBlogs by user ID.
export const GET = async (req, res) => {
    try {
        await initializeDb();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (id) {
            // Logic for fetching a single blog by ID
            console.log(`Fetching blog with ID: ${id}`);
            const blog = await getBlogById(id);
            if (blog) {
                return NextResponse.json({ blog }, { status: 200 });
            } else {
                return NextResponse.json({ message: "Blog ID does not exist." }, { status: 404 });
            }
        } else {
            // Logic for fetching all blogs
            console.log("Fetching all blogs");
            const blogs = await getAllBlog();
            return NextResponse.json(blogs, { status: 200 });
        }
    } catch (err) {
        console.log(err);
        const errorMessage = id ? "Failed to fetch the blog." : "Failed to retrieve blogs.";
        return NextResponse.json({ message: errorMessage }, { status: 500 });
    }
};
export const POST = async (req, res) => {
    try {
        await initializeDb();
        console.log("POST A NEW BLOG");
        const { pid, title, description } = await req.json();
        const newBlogId = await addBlog(pid, title, description);
        return NextResponse.json(
            { newBlogId: newBlogId }, 
            { status: 201 }
        );
    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { message: "Failed to create a new blog." },
            { status: 500 }
        );
    }
 };

 export const PUT = async (req, res) => {
    try {
        await initializeDb();
        const { id, title, description } = await req.json();
        if (!id) {
            return NextResponse.json(
                { message: "No pid provided for updating" },
                { status: 404 }
            );
        }
        console.log(`UPDATE BLOG, ID: ${id}`);
        const result = await updateBlog(id, title, description);
        if (result.updated) {
            return NextResponse.json(
                { message: "Blog post updated successfully" }, 
                { status: 201 }
            );
        } else {
            return NextResponse.json(
                { message: "Blog not found or no changes made" },
                { status: 200 }
            );
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { message: "Failed to update the blog." },
            { status: 500 }
        );
    }
 };

export const DELETE = async (req, res) => {
    try {
        await initializeDb();
        console.log("DELETE BLOG BY ID");
        const { id } = await req.json(); // Extract blog id from the request body
        await deleteBlog(id);
        return NextResponse.json(
            { deletedBlogId: id }, 
            { status: 201 }
        ); // Respond with the deleted id
    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { message: "Failed to delete the blog." },
            { status: 500 }
        );
    }
 };


