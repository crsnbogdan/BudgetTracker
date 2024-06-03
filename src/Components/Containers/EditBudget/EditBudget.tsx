import React, {
  useContext,
  useEffect,
  useState,
  ChangeEvent,
  MouseEvent,
} from "react";
import { AppContext } from "../../../Context/ContextProvider";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import DeleteIcon from "@mui/icons-material/Delete";
// @ts-ignore
import { v4 as uuidv4 } from "uuid";
import styles from "./EditBudget.module.css";
import {
  State,
  Category,
  Categories,
  UpdateCategoriesPayload,
  UpdateBudgetPayload,
} from "../../../Types";

const EditBudget = () => {
  const { dispatch, state, showBudgetModalFunc } = useContext(AppContext) as {
    state: State;
    dispatch: React.Dispatch<any>;
    showBudgetModalFunc: (show: boolean) => void;
  };
  const [totalBudget, setTotalBudget] = useState<string>(
    state.totalBudget.toString()
  );
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [newCategoryColor, setNewCategoryColor] = useState<string>("#ffffff");
  const [tempCategories, setTempCategories] = useState<Categories>({
    ...state.categories,
  });

  useEffect(() => {
    updateCategoryBudgets(tempCategories, Number(totalBudget));
  }, [state.categories, totalBudget]);

  const handleTotalBudgetChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTotalBudget = event.target.value;
    setTotalBudget(newTotalBudget);
    updateCategoryBudgets(tempCategories, Number(newTotalBudget));
  };

  const handleBudgetAmountChange = (
    categoryId: string,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const formattedValue = Number(event.target.value);
    setTempCategories((prevCategories) => {
      const newCategories: Categories = {
        ...prevCategories,
        [categoryId]: {
          ...prevCategories[categoryId],
          used: formattedValue,
          budget: formatValue((formattedValue / Number(totalBudget)) * 100),
        },
      };
      return newCategories;
    });
  };

  const handlePercentageChange = (
    categoryId: string,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const formattedValue = Number(event.target.value);
    setTempCategories((prevCategories) => {
      const newCategories: Categories = {
        ...prevCategories,
        [categoryId]: {
          ...prevCategories[categoryId],
          budget: formattedValue.toString(),
          used: Number(
            formatValue((Number(totalBudget) * formattedValue) / 100)
          ),
        },
      };
      return newCategories;
    });
  };

  const updateCategoryBudgets = (
    categories: Categories,
    totalBudget: number
  ) => {
    const updatedCategories = { ...categories };
    Object.keys(updatedCategories).forEach((categoryId) => {
      const category = updatedCategories[categoryId];
      const percentage = Number(category.budget);
      updatedCategories[categoryId].used = Number(
        formatValue((totalBudget * percentage) / 100)
      );
    });
    setTempCategories(updatedCategories);
  };

  const handleAddCategory = () => {
    if (newCategoryName && newCategoryColor) {
      const newCategoryId = uuidv4();
      const newCategory: Category = {
        id: newCategoryId,
        color: newCategoryColor,
        name: newCategoryName,
        budget: "0",
        used: 0,
      };
      setTempCategories((prevCategories) => ({
        ...prevCategories,
        [newCategoryId]: newCategory,
      }));
      setNewCategoryName("");
      setNewCategoryColor("#ffffff");
    }
  };

  const handleRemoveCategory = (categoryId: string) => {
    setTempCategories((prevCategories) => {
      const { [categoryId]: _, ...remainingCategories } = prevCategories;
      return remainingCategories;
    });
    dispatch({
      type: "removeCategory",
      payload: {
        id: categoryId,
      },
    });
  };

  const handleSubmit = (e?: MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    if (!Number(totalBudget)) return;
    if (totalPercentageUsage > 100) return;
    dispatch({
      type: "updateCategories",
      payload: {
        categories: tempCategories,
      } as UpdateCategoriesPayload,
    });

    dispatch({
      type: "updateBudget",
      payload: {
        totalBudget: Number(totalBudget),
      } as UpdateBudgetPayload,
    });

    showBudgetModalFunc(false);
  };

  const formatValue = (value: number) =>
    value % 1 === 0 ? value.toFixed(0) : value.toFixed(2);

  const totalPercentageUsage = Object.values(tempCategories).reduce(
    (total, category) => total + Number(category.budget),
    0
  );

  const totalUsedAmount = Object.values(tempCategories).reduce(
    (total, category) => total + category.used,
    0
  );

  return (
    <div className={styles.budgetContainer}>
      <div className={styles.formRow}>
        <Input
          label="Total Budget"
          type="number"
          value={totalBudget}
          // @ts-ignore
          onChange={handleTotalBudgetChange}
        />
      </div>
      <div className={styles.formRow}>
        <span className={styles.budgetTotal}>Total Percentage Usage:</span>
        <span
          style={{
            color:
              totalPercentageUsage > 100
                ? "var(--color-button-remove)"
                : "var(--color-text)",
          }}
        >
          {parseFloat(totalPercentageUsage.toFixed(2))}%
        </span>
      </div>
      <div className={styles.formRow}>
        <span className={styles.budgetTotal}>Total Used Amount:</span>
        <span
          style={{
            color:
              totalPercentageUsage > 100
                ? "var(--color-button-remove)"
                : "var(--color-text)",
          }}
        >
          ${totalUsedAmount.toFixed(2)}
        </span>
      </div>
      <div className={styles.formRow}>
        <Input
          label="New Category"
          type="text"
          value={newCategoryName}
          // @ts-ignore
          onChange={(e) => setNewCategoryName(e.target.value as string)}
        />
        <input
          type="color"
          value={newCategoryColor}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewCategoryColor(e.target.value)
          }
          className={styles.colorInput}
        />
        <Button
          onClick={handleAddCategory}
          className={styles.addCategoryButton}
        >
          Add
        </Button>
      </div>
      <h2>Categories</h2>
      <div className={styles.categoriesWrapper}>
        {Object.keys(tempCategories).map((categoryId) => {
          const category = tempCategories[categoryId];
          return (
            <div key={categoryId} className={styles.categoryGroup}>
              <div className={styles.categoryInfo}>
                <div
                  className={styles.categoryCircle}
                  style={{ backgroundColor: category.color }}
                />
                <span>{category.name}</span>
              </div>
              <div className={styles.categoryControls}>
                <Input
                  label="Amount"
                  type="number"
                  value={category.used ? category.used.toString() : ""}
                  onChange={(e) =>
                    handleBudgetAmountChange(
                      categoryId,
                      e as ChangeEvent<HTMLInputElement>
                    )
                  }
                />
                <Input
                  label="Percentage"
                  type="number"
                  value={category.budget ? category.budget.toString() : ""}
                  onChange={(e) =>
                    handlePercentageChange(
                      categoryId,
                      e as ChangeEvent<HTMLInputElement>
                    )
                  }
                />
                <Button
                  onClick={() => handleRemoveCategory(categoryId)}
                  className={styles.deleteButton}
                  isDelete
                  icon={<DeleteIcon />}
                />
              </div>
            </div>
          );
        })}
      </div>
      {totalPercentageUsage > 100 && (
        <span className={styles.formError}>
          Total percentage usage exceeds 100%. Please reduce category
          percentages before updating the budget.
        </span>
      )}
      <div className={styles.formRow}>
        <Button onClick={handleSubmit} className={styles.submitButton}>
          Update Budget
        </Button>
      </div>
    </div>
  );
};

export default EditBudget;
