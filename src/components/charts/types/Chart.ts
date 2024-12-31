export interface ListingItem {
    name: string;
    level_lot: string;
    test_lot: string;
    level: string;
    sd: number;
    mean: number;
    ownMeanValue: number;
    ownSdValue: number;
    date: string;
    value: number;
    unit_value: string;
    description: string;
    rules?: string;
}


export interface ListingCollection extends Array<any> {}

export interface UseFetchListingProps {
    url: string;
    urlMeanAndDeviation: string;
}

export interface GroupedListing {
    level: string;
    values: ListingItem[];
  }

export interface ControlChartProps {
    listing: ListingItem[];
}

export interface MeanStdDevValue {
    mean: number;
    standardDeviation: number;
  }

export interface LevelGroupResponse {
    genericValuesGroupByLevel: {
      level: string;
      values: ListingItem[];
    };
    meanAndStandardDeviationRecordGroupByLevel: {
      level: string;
      values: MeanStdDevValue[];
    };
  }

  
  

export interface MeanAndDeviationDisplayProps {
    mean: number;
    sd: number;
    ownMean: number | null;
    ownSd: number | null;
    unitValue: string | null;
}

export interface MeanAndSdResponse {
    level: string;
    meanAndSd: {
      mean: number;
      standardDeviation: number;
    };
  }

export interface ProcessedData {
    date: string;
    level_lot: string;
    test_lot: string;
    level: string;
    unit_value: string;
    name: string;
    value: string;
    mean: string;
    sd: string;
}

export interface ProcessingStatus {
    isProcessing: boolean;
    message: string;
    error?: string;
}

export interface MultipleLineChartProps {
    listings: LevelGroupResponse[];
    colors?: string[];
}

export interface LabGraphProps {
    testList: string[];
    analyticsType: string;
    levelListSize: number;
}

export interface MultipleLineGraphProps {
    levelListSize: number;
    testList: string[];
    analyticsType: string;
}

export interface ListingData {
    listing: any[];
    unitValue: string | null;
    ownMean: number | null;
    ownSd: number | null;
}
