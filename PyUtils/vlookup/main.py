"""
解释上面代码

上面的代码实现了一个VLOOKUP函数的功能，用于在Excel文件中进行数据的查找和匹配。

首先定义了一个名为`ExcelColumn`的数据类，用于存储Excel文件的相关信息，包括文件路径、工作表名称、关键列和插入列等。其中`data`属性用于存储Excel文件中的数据，`write_sheet_name`属性用于指定写入结果的工作表名称。

接下来定义了一个名为`vlookup`的函数，用于执行VLOOKUP操作。函数首先读取目标Excel文件中的数据，并根据源Excel文件或数据进行查找和匹配操作。最后将匹配结果写入目标Excel文件中。

然后定义了一个名为`patch_vlookup`的函数，用于批量执行VLOOKUP操作。函数接受目标Excel列和源Excel列的列表作为参数，并依次调用`vlookup`函数进行操作。

最后定义了一个名为`main`的函数，用于执行主要逻辑。在`main`函数中，首先创建了目标Excel列和源Excel列的列表，然后调用`patch_vlookup`函数进行批量操作。
"""
from dataclasses import dataclass
import glob
import os
from collections import defaultdict
from typing import List, Dict, Optional

import pandas as pd


@dataclass(kw_only=True)
class ExcelColumn:
    """
    :param path: the path to the file
    :param sheet_name:sheet_name
    :param key_col: 比较两个sheet的列的名字
    :param insert_col: 插入的列的名字
    :param write_sheet_name:sheet_name
    :return:
    """
    path: str
    sheet_name: str | int = 0
    key_col: str
    insert_col: str
    write_sheet_name: Optional[str] = None


def vlookup(dst_excel_col: ExcelColumn, src_excel_or_data: ExcelColumn | pd.DataFrame):
    dst_df: pd.DataFrame = pd.read_excel(dst_excel_col.path, sheet_name=dst_excel_col.sheet_name)
    # if src_datas is None:
    # if  isinstance(src_excel_col, ExcelColumn):
    if isinstance(src_excel_or_data, ExcelColumn):
        scr_df: pd.DataFrame = pd.read_excel(src_excel_or_data.path, sheet_name=src_excel_or_data.sheet_name)
        src_datas: List = scr_df.to_dict('records')
    elif isinstance(src_excel_or_data, pd.DataFrame):
        src_datas: List = src_excel_or_data.to_dict('records')
    else:
        raise TypeError("src_excel_col must be a DataFrame or ExcelColumn")
    d = defaultdict(list)
    for src_data in src_datas:
        d[src_data.get(src_excel_or_data.key_col, "")].append(src_data.get(src_excel_or_data.insert_col, ""))
    dst_df.loc[:, dst_excel_col.insert_col] = dst_df.loc[:, dst_excel_col.key_col].apply(lambda x: d.get(x, [""])[0])
    with pd.ExcelWriter(dst_excel_col.path, mode='a') as writer:
        dst_df.to_excel(writer, sheet_name=f"new_{dst_excel_col.sheet_name}", index=False)


def patch_vlookup(dst_excel_cols: List[ExcelColumn], src_excel_cols: List[ExcelColumn]):
    src_datas = []
    for src_excel_col in src_excel_cols:
        src_df: pd.DataFrame = pd.read_excel(src_excel_col.path, sheet_name=src_excel_col.sheet_name)
        # src_excel_col.df = src_df
        src_datas.append(src_df)
    src_datas = pd.concat(src_datas)
    for src_excel_col in src_excel_cols:
        # src_df: pd.DataFrame = pd.read_excel(src_excel_col.path, sheet_name=src_excel_col.sheet_name)
        # # src_excel_col.df = src_df
        # src_datas.append(src_df)
        src_excel_col.data = src_datas
    for dst_excel_col in dst_excel_cols:
        vlookup(dst_excel_col, src_excel_or_data=src_datas)


def main():
    dst_excel_cols = []
    src_excel_cols = [
        ExcelColumn(
            path=r"D:\code\myCode\package\小工具和脚本\TsProject\src\产品条码\xxx.xlsx",
            sheet_name=0,
            key_col="发货条码",
            insert_col="SOFTWARE PATH"
        )
    ]
    for path in glob.glob(os.path.join(r"D:\files\work\48 王晨sn\sn", "**", "*.xlsx"), recursive=True):
        dst_excel_cols.append(
            ExcelColumn(
                path=path,
                sheet_name=0,
                key_col="发货条码",
                insert_col="SOFTWARE PATH"
            )
        )
    patch_vlookup(dst_excel_cols, src_excel_cols)


if __name__ == "__main__":
    main()

# 最后，在`if __name__ == "__main__":`语句块中调用`main`函数来执行整个程序。
