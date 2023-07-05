import { mongooseConnect } from "@/lib/mongoose.js"
import Category from "@/models/category.js"

export const POST = async (req) => {
    try {
        const jsonData = await req.json();
        const { name, values, parent } = jsonData;
        await mongooseConnect();

        try {
            const newCategory = await Category.create({
                name: name,
                values: values,
                parent: parent,
                children: []
            });

            if (parent) {
                await Category.findByIdAndUpdate(parent, {
                    $set: { isleaf: false },
                    $addToSet: { children: newCategory._id }
                });
            }

            return new Response(JSON.stringify(newCategory), { status: 201 });
        } catch (error) {
            console.log("Error in creating a new category");
            console.error(error);
            return new Response(JSON.stringify(error), { status: 500 });
        }
    } catch (error) {
        console.log("Error in connecting to the database");
        console.error(error);
        return new Response(JSON.stringify(error), { status: 501 });
    }
};


export const GET = async (req) => {
    try {
        await mongooseConnect()
        try {
            const Categories = await Category.find({}).populate('parent').populate('children')
            console.log(Categories)
            return new Response(JSON.stringify(Categories), { status: 200 })
        }
        catch (error) {
            console.log("Error in fetching categories")
            console.error(error)
            return new Response(JSON.stringify(error), { status: 500 })
        }
    }
    catch (error) {
        console.log("Error in connecting to the database")
        console.error(error)
        return new Response(JSON.stringify(error), { status: 501 })
    }
}