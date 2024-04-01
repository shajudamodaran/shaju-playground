import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { GrowthChartDataInterface } from "../interfaces/GrowthChartData";

interface GrowthChartContextType {
  data: GrowthChartDataInterface[];
  addData: (newData: Omit<GrowthChartDataInterface, "id">) => void;
  updateData: (
    id: string,
    updatedFields: Partial<Omit<GrowthChartDataInterface, "id">>
  ) => void;
  removeData: (id: string) => void;
}

const GrowthChartDataContext = createContext<
  GrowthChartContextType | undefined
>(undefined);

interface GrowthChartDataProviderProps {
  children: ReactNode;
}

export const GrowthChartDataProvider: React.FC<
  GrowthChartDataProviderProps
> = ({ children }) => {
  const [data, setData] = useState<GrowthChartDataInterface[]>(
    []
    //     [
    // {
    //   id: "Measurement1",
    //   weight: "4",
    //   length: "130",
    //   headCircumference: "33",
    //   date: "January 2023",
    // },
    // {
    //   id: "Measurement2",
    //   weight: "4.2",
    //   length: "132",
    //   headCircumference: "34",
    //   date: "February 2023",
    // },
    // {
    //   id: "Measurement3",
    //   weight: "4.5",
    //   length: "135",
    //   headCircumference: "35",
    //   date: "March 2023",
    // },
    // {
    //   id: "Measurement4",
    //   weight: "4.8",
    //   length: "138",
    //   headCircumference: "36",
    //   date: "April 2023",
    // },
    // {
    //   id: "Measurement5",
    //   weight: "5",
    //   length: "140",
    //   headCircumference: "37",
    //   date: "May 2023",
    // },
    // {
    //   id: "Measurement6",
    //   weight: "5.2",
    //   length: "142",
    //   headCircumference: "38",
    //   date: "June 2023",
    // },
    // {
    //   id: "Measurement7",
    //   weight: "5.5",
    //   length: "145",
    //   headCircumference: "39",
    //   date: "July 2023",
    // },
    // {
    //   id: "Measurement8",
    //   weight: "5.8",
    //   length: "147",
    //   headCircumference: "40",
    //   date: "August 2023",
    // },
    // {
    //   id: "Measurement9",
    //   weight: "6",
    //   length: "150",
    //   headCircumference: "41",
    //   date: "September 2023",
    // },
    // {
    //   id: "Measurement10",
    //   weight: "6.2",
    //   length: "152",
    //   headCircumference: "42",
    //   date: "October 2023",
    // },
    // {
    //   id: "Measurement11",
    //   weight: "6.5",
    //   length: "155",
    //   headCircumference: "43",
    //   date: "November 2023",
    // },
    // {
    //   id: "Measurement12",
    //   weight: "6.8",
    //   length: "158",
    //   headCircumference: "44",
    //   date: "December 2023",
    // },
    //     ]
  );

  const addData = useCallback(
    (newData: Omit<GrowthChartDataInterface, "id">) => {
      const newDataWithId = { ...newData, id: Date.now().toString() }; // Simple ID generation
      setData((currentData) => [...currentData, newDataWithId]);
    },
    []
  );

  const updateData = useCallback(
    (
      id: string,
      updatedFields: Partial<Omit<GrowthChartDataInterface, "id">>
    ) => {
      setData((currentData) =>
        currentData.map((item) =>
          item.id === id ? { ...item, ...updatedFields } : item
        )
      );
    },
    []
  );

  const removeData = useCallback((id: string) => {
    setData((currentData) => currentData.filter((item) => item.id !== id));
  }, []);

  return (
    <GrowthChartDataContext.Provider
      value={{ data, addData, updateData, removeData }}
    >
      {children}
    </GrowthChartDataContext.Provider>
  );
};

export const useGrowthChartData = () => {
  const context = useContext(GrowthChartDataContext);
  if (!context) {
    throw new Error(
      "useGrowthChartData must be used within a GrowthChartDataProvider"
    );
  }
  return context;
};
