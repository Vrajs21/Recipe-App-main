import { useState, useEffect } from "react";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import { useGetIdentity, useOne } from "@refinedev/core";
import { useNavigate } from "react-router-dom";
import { Shortcut } from "@mui/icons-material";
import dayjs,{ Dayjs } from "dayjs";

import { Loading, RecipeCard } from "../components";
import { RecipeProps, Meal, Ingredient } from "../interfaces/common";

const columns: GridColDef[] = [
    {
        field: "ingredientName",
        headerName: "Ingredient Name",
        flex: 1,
    },
    {
        field: "amount",
        headerName: "Amount",
        type: "number",
        flex: 1,
    },
    { field: "unit", headerName: "Unit", flex: 1 },
];

const Home = () => {
    const [viewDate, setViewDate] = useState<Dayjs | null>(null);
    const navigate = useNavigate();
    const { data: user } = useGetIdentity({
        v3LegacyAuthProviderCompatible: true
    });
    const { data, isLoading, isError } = useOne({
        resource: "users",
        id: user?.userId,
    });

    //const myProfile = {"_id":{"$oid":"651048a58caab501db3db3fe"},"name":"Harshal Shah","email":"harahalshah606@gmail.com","avatar":"https://lh3.googleusercontent.com/a/ACg8ocJv1p7pi9zuaLPQ83gu_v57W6qcsFOrXsvmLU65ORAX=s96-c","allRecipes":[],"savedRecipes":[],"mealPlan":[],"recipes":[],"shoppingList":[],"__v":{"$numberInt":"0"}}
    const myProfile = data?.data ?? [];
    let shoppingList: Ingredient[] = [];
    if ('shoppingList' in myProfile) {
      // TypeScript now knows that myProfile is of type BaseRecord
      shoppingList = myProfile.shoppingList;
    }
    useEffect(() => setViewDate(dayjs()), []);

    // Loading and Error Component
   if (isLoading) return <Loading />
    if (isError) return <div>Error</div>;
    let mealPlan: Meal[] = [];
    if ('mealPlan' in myProfile) {
      // TypeScript now knows that myProfile is of type BaseRecord
      mealPlan = myProfile.mealPlan;
    }
    const todayMeals = mealPlan.find((day: Meal) => {
        const parsedDate = new Date(day.date + "T00:00:00");
        // console.log(parsedDate);
        return (
            parsedDate.getFullYear() === viewDate?.year() &&
            parsedDate.getMonth() === viewDate?.month() &&
            parsedDate.getDate() === viewDate?.date()
        );
    });

    const rows: GridRowsProp = shoppingList.map((row, index) => {
        return {
            id: index,
            ingredientName: row.name,
            amount: row.amount,
            unit: row.unit,
        };
    });

    return (
        <>
            <Stack direction="column" gap={2.5}>
                <Typography fontSize={25} fontWeight={700} color="#11142d">
                    Dashboard
                </Typography>
                <Box borderRadius="15px" padding="20px" bgcolor="#FCFCFC">
                    <Box display="flex" alignItems="center">
                        <Typography
                            fontSize={20}
                            fontWeight={700}
                            color="#11142D"
                        >
                            Today's Meals
                        </Typography>
                        <IconButton onClick={() => navigate("/meal-plan")}>
                            <Shortcut />
                        </IconButton>
                    </Box>
                    
                    { (
                        <Box borderRadius="15px">
                            <Box
                                sx={{
                                    mt: 2.5,
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 2.5,
                                }}
                            >
                                {todayMeals?.recipes.map(
                                    (recipe: RecipeProps) => (
                                        <RecipeCard
                                            key={recipe._id}
                                            id={recipe._id}
                                            title={recipe.title}
                                            estimateTime={recipe.estimateTime}
                                            photo={recipe.photo}
                                            servings={recipe.servings}
                                        />
                                    )
                                )}
                            </Box>
                        </Box>
                    )}
                


                </Box>
                <Box borderRadius="15px" padding="20px" bgcolor="#FCFCFC">
                    <Box display="flex" alignItems="center">
                        <Typography
                            fontSize={20}
                            fontWeight={700}
                            color="#11142D"
                        >
                            Shopping List
                        </Typography>
                        <IconButton onClick={() => navigate("/shopping-list")}>
                            <Shortcut />
                        </IconButton>
                    </Box>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        autoHeight
                        pageSize={5}
                        autoPageSize
                        sx={{ mt: 2.5 }}
                    />
                </Box>
                <Box borderRadius="15px" padding="20px" bgcolor="#FCFCFC">
                    <Box display="flex" alignItems="center">
                        <Typography
                            fontSize={20}
                            fontWeight={700}
                            color="#11142D"
                        >
                            Saved Recipes
                        </Typography>
                        <IconButton onClick={() => navigate("/saved")}>
                            <Shortcut />
                        </IconButton>
                    </Box>
                    
                    {myProfile && myProfile.savedRecipes && myProfile.savedRecipes.length > 0 && (
                        <Box borderRadius="15px">
                            <Box
                                sx={{
                                    mt: 2.5,
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 2.5,
                                }}
                            >
                                {myProfile.savedRecipes
                                    ?.slice(
                                        0,
                                        Math.min(
                                            myProfile.savedRecipes.length,
                                            3
                                        )
                                    )
                                    .map((recipe: RecipeProps) => (
                                        <RecipeCard
                                            key={recipe._id}
                                            id={recipe._id}
                                            title={recipe.title}
                                            estimateTime={recipe.estimateTime}
                                            photo={recipe.photo}
                                            servings={recipe.servings}
                                        />
                                    ))}
                            </Box>
                        </Box>
                    )}
                </Box>
            </Stack>
        </>
    );
};

export default Home;
