import React, { useState, useEffect } from "react";
import { Input, Tree, TreeSelect } from "antd";
import Icon ,{AreaChartOutlined} from '@ant-design/icons';
import { ReactComponent as svgImg } from '.././../../public/icons/approvalnode.svg';
import { ReactComponent as svgImg1 } from '.././../../public/icons/makesendnode.svg';
import { ReactComponent as svgImg2 } from '.././../../public/icons/endnode.svg';

const { Search } = Input;
let timecontentId:any = null;
const { TreeNode } = TreeSelect;

const HightlightText = () => {

  const list = [
    {
      title: '测试文本1-1-1-1-1-2-3-4'
    },
    {
      title: '测试文本8-1'
    },
    {
      title: '测试文本89-1'
    },
  ]

  const [searchText, setSearchText] = useState<string>('')
  const [resList, setResList] = useState<{title: string}[]>([])
  const [treeData, setTreeData] = useState<any>([])
  const [expandedKeys, setExpandedKeys] = useState<any>(['1'])

  const onSearch = (value: string) => {
    setSearchText(value);
    if(value) {
      setResList(list.filter(x => x.title.indexOf(value) > -1))
    } else {
      setResList(list)
    }
  }
  const replaceNode = (str:string) => {
    if(searchText) {
      const index = str.indexOf(searchText)
      // if(index > -1) {
      //   const frontStr = str.substring(0, index)
      //   const endStr = str.substring(index+searchText.length, str.length)        
      //   return(<span>
      //     {frontStr}<span style={{color: 'red'}}>{searchText}</span>{endStr}
      //   </span>)
      // }
      if(index > -1) {
        const strArr = str.split(searchText)            
        return(<>
          {strArr.map((item, index) => {
            // 恰好匹配到开头
            if(item == '' && index == 0) {
             return <span key={index+new Date().valueOf()} style={{color: 'red'}}>{searchText}</span>
            } 
            if (index < strArr.length -1) {
              return<React.Fragment key={index+new Date().valueOf()}>
                {item}
                <span style={{color: 'red'}}>{searchText}</span>
              </React.Fragment>
            } 
            return item
          })}
        </>
        )
      }
    } 
    return str;
  }

  const onInputChange = (e: any) => {
    if(timecontentId) {clearTimeout(timecontentId)}
    timecontentId = setTimeout(() => {
      console.log(e.target.value);
    }, 200)
  }

  useEffect(() => {
    setTimeout(() => {
      const treeData = [
        {
          title: 'parent 1',
          contentId: 1,
          disabled: true,
          selectable: false,
          children: [
            {
              title: 'parent 1-0',
              contentId: 2,
              children: [
                {
                  title: 'leaf',
                  contentId: 3,
                },
                {
                  title: 'leaf',
                  contentId: 4,
                },
              ],
            },
            {
              title: 'parent 1-1',
              contentId: 5,
              children: [{ title: 'sss', contentId: 6 }],
            },
          ],
        },
      ];
      const keys:any = []
      const getKeys = (data:any) => {
        if(data && data.length > 0) {
          const item = data[0]
          if(item?.contentId) {
            keys.push(data[0]?.contentId)
          }
          if(item.children && item.children.length > 0) {
            getKeys(item.children)
          }
        }
      }
      getKeys(treeData)
      setTreeData(treeData)
      setExpandedKeys(keys)
    }, 300);
  }, [])

  const onExpand = (expandedKeys: any) => {
    console.log(expandedKeys);
    setExpandedKeys(expandedKeys)
  }
  
  const [value, setValue] = useState(undefined);
  const onChange = () => {
    setValue(value);
  };

  const treeDatas = [
    {
      title: 'Node1',
      value: '0-0',
      children: [
        {
          title: 'Child Node1',
          value: '0-0-1',
          children: [
            {
              title: '122',
              value: '999',
              children: [
                {
                  title: 'Node1',
                  value: '11',
                  children: [
                    {
                      title: 'Child Node1',
                      value: '12',
                      children: [
                        {
                          title: '122',
                          value: '13',
                        }
                      ]
                    },
                    {
                      title: 'Child Node2',
                      value: '14',
                    },
                  ],
                },
                {
                  title: 'Node2',
                  value: '15',
                },
              ]
            }
          ]
        },
        {
          title: 'Child Node2',
          value: '0-0-2',
        },
      ],
    },
    {
      title: 'Node2',
      value: '0-1',
    },
  ];

  const renderTreeNode = (treeDatas:any) => {
    let node:any = []
    treeDatas.forEach((item:any) => {
      if(item.children && item.children.length > 0) {
        let tmpNode = renderTreeNode(item.children)
        node.push(
          <TreeNode value={item.value} title={item.title} key={value}>
            {tmpNode}
          </TreeNode>
        )
      } else {
        node.push(
          <TreeNode value={item.value} title={item.title} key={value}>
          </TreeNode>
        )
      }
    });
    return node
  }

  // console.log(renderTreeNode(treeDatas));
  

  return (
    <div>
      <h1>高亮显示文字</h1>
      <Search
        onSearch={onSearch} 
      />
      {resList.map(item => {
        return(
          <div key={item.title}>{item?.title ? replaceNode(item?.title) : ''}</div>
        )
      })}

      <h2>延时自动查询</h2>
      <Input onChange={onInputChange} />
      <h1>Tree组件用expandedKeys控制，自动展开</h1>
      {/* 用expandedKeys控制 */}
      <Tree 
        treeData={treeData as any}
        expandedKeys={expandedKeys}
        onExpand={onExpand}
        fieldNames={{
          title: 'title', 
          key: 'contentId', 
          children: 'children'
        }}
      />
      <h1>解决Tree组件用了defaultExpandedKeys，关闭再次打开页面，不能自动展开问题</h1>
      {/* default开头的需要首次渲染才行，当有数据时才渲染，此时就会有数据展开 */}
      {treeData && treeData.length > 0 && <Tree 
        treeData={treeData as any}
        defaultExpandedKeys={[1]}
        fieldNames={{
          title: 'title', 
          key: 'contentId', 
          children: 'children'
        }}
      />}
      <h1>树形选择组件用TreeNode递归渲染</h1>
      <TreeSelect
        showSearch
        style={{ width: '100%' }}
        value={value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select"
        allowClear
        treeDefaultExpandAll
        onChange={onChange}
        treeIcon={true}
      >
        {renderTreeNode(treeDatas)}
      </TreeSelect>
      <h1>自定义的svg图片颜色</h1>
      <div><Icon component={svgImg} style={{fontSize: '60px', color: 'red'}} /></div>
      <div><Icon component={svgImg1} style={{fontSize: '60px', color: 'red'}} /></div>
      <div><Icon component={svgImg2} style={{fontSize: '60px', color: 'red'}} /></div>
      <AreaChartOutlined style={{fontSize: '60px', color: 'red'}}/>
      
    </div>
    
  )
}
export default HightlightText;