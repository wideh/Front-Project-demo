import React, { useState, CSSProperties, useEffect } from 'react'
import { Drawer, Modal, Row, Col, Button, Space, Tabs, Card, Descriptions, Table, Popconfirm, Anchor, Dropdown, Menu, Tag, Tooltip, Upload, Spin, message } from 'antd';
import { EllipsisOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import styles from './index.less';
import moment from 'moment';
import numeral from 'numeral'
import ActionModal, { ActionEnum, BtnIdEnum } from '../Modal/ActionModal';
import * as WorkOrderManagementService from '../../../../services/WorkOrderManagement/WorkOrderManagementService';
// import buttonPermissionCode from '../../../../utils/buttonPermissionCode';
// import * as commonDataService from '@novaFrontCommon/services/commonData';

const { Item } = Descriptions;
const { Link } = Anchor;
const ButtonGroup = Button.Group;
let timeId: any = null;

const labelStyle: CSSProperties = {
	width: '72px',
	textAlign: 'right',
	display: 'inline-block',
};

const WorkOrderDetailDraw = props => {
	const {
		dispatch,
		reloadTable,
		closeDrawer,
		visible,
		info,
		loading,
	} = props;

	const dispatchList:any = [], 
				materialsList:any = [],
				dispatchChargesList:any = [],
				returnVisitList:any = [],
				historiesList:any = [],
				baseInfo:any = {};

	const [activeKey, setActiveKey] = useState<string>('#base-info')
	const [actionModalInfo, setActionModalInfo] = React.useState<{
		title: ActionEnum;
		visible: boolean;
		row: any;
	}>();
	const [mainBtns, setMainBtns] = useState<any>([]);
	const [topBtns, setTopBtns] = useState<any>([]);
	const [moreBtns, setMoreBtns] = useState<any>([]);
	const [otherBtns, setOtherBtns] = useState<any>([]);
	const [isExpand, setIsExpand] = useState<boolean>(false);
	const [previewVisible, setPreviewVisible] = useState<boolean>(false);
	const [previewImage, setPreviewImage] = useState<any>('');

	const renderStatus = (text) => {
		switch (text) {
			case '待分配':
				return <Tag color="orange">待分配</Tag>
			case '已分配':
				return <Tag color="geekblue">{text}</Tag>;
			case '待处理':
			case '处理中':
				return <Tag color="blue">{text}</Tag>;
			case '已处理':
				return <Tag color="greenyellow">{text}</Tag>;
			case '待确认':
				return <Tag color="green">{text}</Tag>;
			case '待回访':
				return <Tag color="magenta">{text}</Tag>;
			case '待评价':
				return <Tag color="purple">{text}</Tag>;
			case '已确认未完成':
				return <Tag color="green">{text}</Tag>;
			case '已确认已完成':
				return <Tag color="#800080">{text}</Tag>;
			case '已关闭':
				return <Tag color="default">{text}</Tag>;
			case '已撤销':
				return <Tag color="darkgray">{text}</Tag>;
			case '已作废':
				return <Tag color="lightgray">{text}</Tag>;
			case '已撤回':
				return <Tag color="red">{text}</Tag>;
			default:
				return <Tag color="indianred">{text}</Tag>;
		}
	}

	useEffect(() => {
		if (info?.id) {
			getBaseDetail(info?.id);
			dispatch({
				type: 'workOrderDraw/getAllDetail',
				payload: { id: info?.id },
			})
		}
		return () => {
			if (timeId) {
				clearTimeout(timeId);
			}
		}
	}, []);

	useEffect(() => {
		getPermissions(info?.id)
	}, [baseInfo])

	const reLoad = () => {
		if (timeId) {
			clearTimeout(timeId)
		}
		timeId = setTimeout(() => {
			if (info?.id) {
				getBaseDetail(info?.id);
				dispatch({
					type: 'workOrderDraw/getAllDetail',
					payload: { id: info?.id },
				})
			}
			reloadTable && reloadTable();
		}, 500);
	}

	const getBaseDetail = (id) => {
		dispatch({
			type: 'workOrderDraw/initData',
			payload: { id }
		})
	};

	const getPermissions = async (id: any) => {
		if (!id) return;
		const res = await WorkOrderManagementService.getPermissions(id);
		// const buttonRes = await commonDataService.checkPermissions([
		// 	buttonPermissionCode.repairManagePrint,
		// 	buttonPermissionCode.repairManagePrintdispatch,
		// ]);

		let repairPrint = false, dispatchPrint = false;
		// if (buttonRes) {
			// const repairManagePrint = buttonRes.find(x => x.code === buttonPermissionCode.repairManagePrint)
			// const repairManagePrintdispatch = buttonRes.find(x => x.code === buttonPermissionCode.repairManagePrintdispatch)
			// repairPrint = repairManagePrint.approve;
			// dispatchPrint = repairManagePrintdispatch.approve;
		// }
		let topBtns: any = [];
		let otherBtns: any = [];
		let moreBtns: any = [];

		if (res?.result?.buttons?.length > 0) {
			for (let i = 0; i < res.result.buttons.length; i++) {
				const item = res.result.buttons[i];
				if ([
					BtnIdEnum.派工,
					BtnIdEnum.回单,
					BtnIdEnum.评价,
					BtnIdEnum.确认,
					BtnIdEnum.回访,
					BtnIdEnum.开始处理,
					BtnIdEnum.接收,
					BtnIdEnum.继续处理,
					BtnIdEnum.现场签到
				].includes(item.buttonType)) {
					topBtns.unshift(item);
				}
				if ([BtnIdEnum.退回,
				BtnIdEnum.转交,
				BtnIdEnum.关闭,
				BtnIdEnum.备注,
				BtnIdEnum.延时申请,
				BtnIdEnum.编辑工单类型,
				BtnIdEnum.拒绝
				].includes(item.buttonType)) {
					topBtns.push(item);
				}
				if ([BtnIdEnum.领料].includes(item.buttonType)) {
					otherBtns.unshift(item);
				}
				if ([BtnIdEnum.退料,
				BtnIdEnum.添加费用,
				BtnIdEnum.删除费用,
				].includes(item.buttonType)) {
					otherBtns.push(item);
				}
			}

			if (baseInfo?.dispatchId && dispatchPrint && !baseInfo?.isHandover) {
				topBtns.push({
					buttonTypeStr: '打印派工单',
					buttonType: 200,
				});
			}
			if (baseInfo?.repairStatusStr == '已关闭' && repairPrint) {
				topBtns.push({
					buttonTypeStr: '打印报修单',
					buttonType: 201,
				});
			}

			const isHasMainBtn = [
				BtnIdEnum.派工,
				BtnIdEnum.回单,
				BtnIdEnum.评价,
				BtnIdEnum.确认,
				BtnIdEnum.回访,
				BtnIdEnum.开始处理,
				BtnIdEnum.接收
			].includes(topBtns[0].buttonType);

			if (isHasMainBtn) {
				if ((['待确认', '待回访', '待评价', '已关闭']).includes(baseInfo?.repairStatusStr) && showCharge) {
					topBtns.splice(1, 0, {
						buttonTypeStr: '收费',
						buttonType: 202,
					})
				}
			} else {
				if ((['待确认', '待回访', '待评价', '已关闭']).includes(baseInfo?.repairStatusStr) && showCharge) {
					topBtns.unshift({
						buttonTypeStr: '收费',
						buttonType: 202,
					});
				}
			}

			setMainBtns([topBtns.shift()]);
			if (topBtns.length > 3) {
				moreBtns = topBtns.splice(2, topBtns.length - 2)
			}
			setTopBtns(topBtns);
			setMoreBtns(moreBtns);
			setOtherBtns(otherBtns);
		} else {
			if ((['待确认', '待回访', '待评价', '已关闭']).includes(baseInfo?.repairStatusStr) && showCharge) {
				topBtns.push({
					buttonTypeStr: '收费',
					buttonType: 202,
				});
			}
			if (baseInfo?.dispatchId && dispatchPrint) {
				topBtns.push({
					buttonTypeStr: '打印派工单',
					buttonType: 200,
				});
			}
			if (baseInfo?.repairStatusStr == '已关闭' && repairPrint) {
				topBtns.push({
					buttonTypeStr: '打印报修单',
					buttonType: 201,
				});
			}
			if (topBtns?.length > 0) {
				setMainBtns([topBtns.shift()]);
				setTopBtns(topBtns);
			} else {
				setMainBtns([]);
				setTopBtns([]);
			}
			setMoreBtns([]);
			setOtherBtns([]);
		}
	}

	const deleteChargeItem = async (record: any) => {
		const res = await WorkOrderManagementService.deleteCharge({
			repairId: info?.id,
			dispatchChargeId: record.id,
		});
		if (res?.success) {
			reLoad && reLoad();
		}
	}

	const dispatchColumns = [
		{
			title: '派工单号',
			dataIndex: 'code',
			key: 'code',
			width: 196,
			ellipsis: true,
		},
		{
			title: '分配人',
			dataIndex: 'dispatchEmployName',
			key: 'dispatchEmployName',
			width: 100,
			ellipsis: true,
		},
		{
			title: '工单大类',
			dataIndex: 'repairTypeParentName',
			key: 'repairTypeParentName',
			width: 100,
			ellipsis: true,
		},
		{
			title: '工单子类',
			dataIndex: 'repairTypeName',
			key: 'repairTypeName',
			width: 100,
			ellipsis: true,
		},
		{
			title: '工单时限',
			dataIndex: 'repairPriorityName',
			key: 'repairPriorityName',
			width: 120,
			render: (_, record) => {
				return <Tooltip placement="topLeft" title={record.repairPriorityName}>
					<span
						style={{
							width: '104px',
							display: 'inline-block',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap',
							overflow: 'hidden'
						}}
					>
						{record.repairPriorityName}
					</span>
				</Tooltip>
			},
		},
		{
			title: '服务类型',
			dataIndex: 'chargeType',
			key: 'chargeType',
			width: 100,
			ellipsis: true,
		},
		{
			title: '指派给',
			dataIndex: 'employName',
			key: 'employName',
			width: 100,
			ellipsis: true,
		},
		{
			title: '派工时间',
			dataIndex: 'creationDate',
			key: 'creationDate',
			width: 150,
			render: (text, record) => {
				return record?.creationDate ? moment(record?.creationDate).format('YYYY/MM/DD HH:mm') : ''
			}
		},
		{
			title: '派工备注',
			dataIndex: 'remark',
			key: 'remark',
			width: 180,
			render: (_, record) => {
				return <Tooltip placement="topLeft" title={record.remark}>
					<span
						style={{
							width: '164px',
							display: 'inline-block',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap',
							overflow: 'hidden'
						}}
					>
						{record.remark}
					</span>
				</Tooltip>
			},
		},
	]

	const fixColumns: any = [
		{
			title: '物料名称',
			dataIndex: 'name',
			key: 'name',
			width: 120,
			ellipsis: true,
		},
		{
			title: '品牌',
			dataIndex: 'brand',
			key: 'brand',
			width: 80,
			ellipsis: true,
		},
		{
			title: '规格型号',
			dataIndex: 'model',
			key: 'model',
			width: 120,
			ellipsis: true,
		},
		{
			title: '单位',
			dataIndex: 'unit',
			key: 'unit',
			width: 80,
			ellipsis: true,
		},
		{
			title: '出库单价',
			dataIndex: 'price',
			key: 'price',
			width: 120,
			ellipsis: true,
		},
		{
			title: '领用数量',
			dataIndex: 'number',
			key: 'number',
			width: 90,
			align: 'right',
			render: (text) => {
				return text === undefined || text === null ? '' : numeral(text).format('0,0')
			}
		},
		{
			title: '金额',
			dataIndex: 'amount',
			key: 'amount',
			width: 90,
			align: 'right',
			render: (text) => {
				return text === undefined || text === null ? '' : numeral(text).format('0,0.00')
			}
		},
		{
			title: '状态',
			dataIndex: 'isPay',
			key: 'isPay',
			width: 80,
			ellipsis: true,
			render: (_, record) => {
				return record?.isPay ? '已付款' : '未付款'
			}
		},
	]

	const serviceColumns: any = [
		{
			title: '收费标准名称',
			dataIndex: 'chargeItemName',
			key: 'chargeItemName',
			width: 160,
			ellipsis: true,
		},
		{
			title: '计费方式',
			dataIndex: 'calculationMethod',
			key: 'calculationMethod',
			width: 100,
			ellipsis: true,
		},
		{
			title: '单价',
			dataIndex: 'calculationPrice',
			key: 'calculationPrice',
			width: 80,
			ellipsis: true,
		},
		{
			title: '数量',
			dataIndex: 'number',
			key: 'number',
			width: 80,
			align: 'right',
			render: (text) => {
				return text === undefined || text === null ? '' : numeral(text).format('0,0')
			}
		},
		{
			title: '金额',
			dataIndex: 'amount',
			key: 'amount',
			width: 100,
			align: 'right',
			render: (text) => {
				return text === undefined || text === null ? '' : numeral(text).format('0,0.00')
			}
		},
		{
			title: '状态',
			dataIndex: 'isPay',
			key: 'isPay',
			width: 80,
			ellipsis: true,
			render: (_, record) => {
				return record?.isPay ? '已付款' : '未付款'
			}
		},
		{
			title: '操作',
			width: 80,
			render: (_, record: any) => {
				return otherBtns.map(item => {
					const buttonType = item.buttonType;
					if (buttonType === BtnIdEnum.删除费用) {
						return <Popconfirm
							title="确认删除？"
							onConfirm={() => deleteChargeItem(record)}
							okText="确定"
							cancelText="取消"
						>
							<a>删除</a>
						</Popconfirm>
					}
				})
			},
		}
	]

	const customerColumns: any = [
		{
			title: '评价途径',
			dataIndex: 'source',
			key: 'source',
			width: 90,
		},
		{
			title: '评价时间',
			dataIndex: 'commentTime',
			key: 'commentTime',
			width: 142,
			render: (text) => {
				return text ? moment(text).format('YYYY/MM/DD HH:mm') : ''
			}
		},
		{
			title: '回访人员',
			dataIndex: 'returnVisitOperator',
			key: 'returnVisitOperator',
			width: 90,
			ellipsis: true,
		},
		{
			title: '评价人',
			dataIndex: 'commentPerson',
			key: 'commentPerson',
			width: 90,
			ellipsis: true,
		},
		{
			title: '评价人电话',
			dataIndex: 'commentPersonPhone',
			key: 'commentPersonPhone',
			width: 117,
			ellipsis: true,
		},
		{
			title: '综合评价',
			dataIndex: 'commentStar',
			key: 'commentStar',
			width: 90,
			ellipsis: true,
			render: (text) => {
				return text ? `${text}星` : ''
			}
		},
	]

	const recordColumns: any = [
		{
			title: '操作时间',
			dataIndex: 'creationDate',
			key: 'creationDate',
			width: 130,
			render: (text, record) => {
				return record.creationDate ? moment(record.creationDate).format('YYYY/MM/DD HH:mm') : ''
			}
		},
		{
			title: '操作类型',
			dataIndex: 'operationType',
			key: 'operationType',
			width: 100
		},
		{
			title: '操作人',
			dataIndex: 'createEmployName',
			key: 'createEmployName',
			width: 100
		},
		{
			title: '操作内容',
			dataIndex: 'content',
			key: 'content',
			width: 220
		},
		{
			title: '图片',
			dataIndex: 'picture',
			key: 'picture',
			width: 190,
			render: (text, record) => {
				if (record.attachments !== null && record.attachments.length > 0) {
					const fileList = record.attachments.map(item => {
						const photo = {
							uid: item.fileName,
							name: item.fileName,
							url: item.filePath,
						};
						return photo;
					});
					return <Upload className={styles.uploadPictrue} fileList={fileList} key={record.id} {...uploadFiles} disabled />
				}
			},
		},
	]

	const uploadFiles: any = {
		name: 'file',
		listType: 'picture-card',
		onPreview: file => {
			setPreviewImage(file.url || file.thumbUrl || file.fileUrl);
			setPreviewVisible(true);
		},
	};

	const onTabKeyChanged = (key) => {
		setActiveKey(key)
	}

	const onAnchorChanged = (key) => {
		setActiveKey(key)
	}

	const onButtonClick = async (buttonName: any) => {
		if (buttonName == '回单' || buttonName == '退回') {
			const res = await WorkOrderManagementService.isPendingFlow(baseInfo.id);
			if (res?.success) {
				if (res.result) {
					if (res.result.indexOf('延时申请') > -1) {
						Modal.warning({
							wrapClassName: styles.selfConfirmModal,
							icon: <span className='novaIconCls'><ExclamationCircleFilled /></span>,
							title: <span style={{ fontWeight: 600 }}>提示</span>,
							content: `有正在审批中的延时申请, 需要审批完成后才能${buttonName}`,
							okText: '知道了',
						})
					} else if (res.result.indexOf('领料申请') > -1) {
						Modal.warning({
							wrapClassName: styles.selfConfirmModal,
							icon: <span className='novaIconCls'><ExclamationCircleFilled /></span>,
							title: <span style={{ fontWeight: 600 }}>提示</span>,
							content: `有正在审批中的领料申请, 需要审批完成后才能${buttonName}`,
							okText: '知道了',
						})
					} else {
						message.warning(res.result);
					}
					return;
				}
			}
		}
		setActionModalInfo({
			title: buttonName,
			visible: true,
			row: baseInfo,
		});
	};

	const handleStartDeal = async () => {
		const res: any = await WorkOrderManagementService.startDealSubmit({ repairId: info?.id });
		if (res?.success) {
			reLoad()
		}
	}

	let total: any = 0;
	dispatchChargesList.map(item => {
		if (item.amount) {
			total += item.amount
		}
	})

	let totalAmount: any = 0, totalNumber: any = 0;
	materialsList.map(item => {
		if (item.amount) {
			totalAmount += item.amount;
		}
		if (item.number) {
			totalNumber += item.number;
		}
	})

	const renderItem = (list) => {
		if (list && list.length > 0) {
			const fileList = list.map(item => {
				const photo = {
					uid: item.fileName,
					name: item.fileName,
					url: item.filePath,
				};
				return photo;
			});
			return <Upload className={styles.uploadbasePic} fileList={fileList} key={info?.id} {...uploadFiles} disabled />
		} else {
			return null;
		}
	}

	// 渲染顶部按钮
	const renderBtns = (name, buttonType, type: any = "default", isMenu?: boolean) => {
		if ([BtnIdEnum.回单, BtnIdEnum.确认, BtnIdEnum.回访, BtnIdEnum.延时申请, BtnIdEnum.转交, BtnIdEnum.备注, BtnIdEnum.退回, BtnIdEnum.关闭, BtnIdEnum.编辑工单类型].includes(buttonType)) {
			return isMenu ?
				<Menu.Item key={buttonType}>
					<a onClick={() => onButtonClick(name)}>
						{name}
					</a>
				</Menu.Item>
				:
				<Button
					key={buttonType}
					type={type} style={{ borderRadius: '0' }}
					onClick={() => onButtonClick(name)}
				>
					{name}
				</Button>
		}
		if ([BtnIdEnum.派工].includes(buttonType)) {
			return isMenu ?
				<Menu.Item key={buttonType}>
					<a onClick={() => {}}>{name}</a>
				</Menu.Item>
				:
				<Button
					key={buttonType}
					type={type} style={{ borderRadius: '0' }}
					onClick={() => {}}
				>
					{name}
				</Button>
		}
		if ([BtnIdEnum.开始处理].includes(buttonType)) {
			return isMenu ?
				<Menu.Item key={buttonType}>
					<a onClick={() => handleStartDeal()}>{name}</a>
				</Menu.Item>
				:
				<Button
					key={buttonType}
					type={type} style={{ borderRadius: '0' }}
					onClick={() => handleStartDeal()}
				>
					{name}
				</Button>
		}
	}

	const getFontColor = (colour) => {
		const hex = colour.replace(/#/, '');
		const r = parseInt(hex.substr(0, 2), 16);
		const g = parseInt(hex.substr(2, 2), 16);
		const b = parseInt(hex.substr(4, 2), 16);

		return [
			0.299 * r,
			0.587 * g,
			0.114 * b
		].reduce((a, b) => a + b) / 255 > 0.5 ? '#000' : '#fff';
	};

	return (
		<Drawer
			title="工单详情"
			placement="right"
			width={900}
			visible={visible}
			footer={null}
			onClose={closeDrawer}
			className={styles.workorderwrap}
		>
			<Spin spinning={loading}>
				<Row className={styles.topbar}>
					<Col span={14} >
						<div className={styles.topInfo}>
							<span className={styles.gdno}>{baseInfo?.code}</span> <span style={{ marginLeft: '5px' }}>{renderStatus(baseInfo?.repairStatusStr)}</span>
							{
								baseInfo?.isHandover && <span
									style={{
										display: 'inline-block',
										color: '#722ED1',
										background: '#f9f0ff',
										border: '1px solid #e1c6fa',
										height: '20px',
										padding: '0 7px',
										marginLeft: '8px',
										textAlign: 'center',
										fontSize: '12px',
										lineHeight: '20px',
										minWidth: '28px',
										borderRadius: '2px'
									}}>
									转交工单
								</span>
							}
							{
								baseInfo?.overtimeInfo &&
								<span
									style={{
										display: 'inline-block',
										background: `${baseInfo?.overtimeInfo.color}`,
										color: `${getFontColor(baseInfo?.overtimeInfo.color)}`,
										height: '20px',
										padding: '0 7px',
										marginLeft: '8px',
										textAlign: 'center',
										minWidth: '28px',
										fontSize: '12px',
										lineHeight: '20px',
										borderRadius: '2px'
									}}
								>
									{`${baseInfo.overtimeInfo.overtimeMinute >= 0 ? `超时${baseInfo.overtimeInfo.overtimeMinute}分钟` : `${baseInfo.overtimeInfo.overtimeMinute * -1}分钟后即将超时`}`}
								</span>
							}
						</div>
					</Col>
					<Col span={10} className={styles.btnsgroup}>
						<ButtonGroup>
							{topBtns.map(item => {
								const name = item.buttonTypeStr;
								const buttonType = item.buttonType;
								return renderBtns(name, buttonType);
							})}
							{moreBtns.length > 0 &&
								<Dropdown
									placement="bottomRight"
									overlay={
										<Menu style={{ minWidth: '60px', textAlign: 'center' }}>
											{moreBtns.map((item) => {
												const name = item.buttonTypeStr
												const buttonType = item.buttonType
												return renderBtns(name, buttonType, 'default', true);
											})}
										</Menu>
									}
								// trigger={['click']}
								>
									<Button style={{ width: '40px' }} icon={<EllipsisOutlined />} />
									{/* <Button>更多</Button> */}
								</Dropdown>}
							{mainBtns.length > 0 && mainBtns.map(item => {
								const name = item.buttonTypeStr;
								const buttonType = item.buttonType;
								return renderBtns(name, buttonType, 'primary');
							})}
						</ButtonGroup>
					</Col>
				</Row>
				<Anchor affix={false} getContainer={() => document.getElementById('detail-content')!} onChange={onAnchorChanged}>
					<Tabs activeKey={activeKey} onChange={onTabKeyChanged}>
						<Tabs.TabPane key='#base-info' tab={<Link href='#base-info' title="报修详情"></Link>}></Tabs.TabPane>
						<Tabs.TabPane key='#dispatch-info' tab={<Link href='#dispatch-info' title="派工详情"></Link>}></Tabs.TabPane>
						{((otherBtns.findIndex(item => [BtnIdEnum.领料, BtnIdEnum.退料].includes(item.buttonType)) > -1) || materialsList?.length > 0) &&
							<Tabs.TabPane key='#fix-info' tab={<Link href='#fix-info' title="维修材料"></Link>}></Tabs.TabPane>
						}
						{((otherBtns.findIndex(item => [BtnIdEnum.添加费用, BtnIdEnum.删除费用].includes(item.buttonType)) > -1) || dispatchChargesList?.length > 0) &&
							<Tabs.TabPane key='#service-charge' tab={<Link href='#service-charge' title="服务费用"></Link>}></Tabs.TabPane>
						}
						{((['待回访', '待评价'].includes(baseInfo?.repairStatusStr)) || returnVisitList?.length > 0) &&
							<Tabs.TabPane key='#customer-back' tab={<Link href='#customer-back' title="客户评价"></Link>}></Tabs.TabPane>
						}
						<Tabs.TabPane key='#record' tab={<Link href='#record' title="处理记录"></Link>}></Tabs.TabPane>
					</Tabs>
				</Anchor>

				<div className={styles.content} id="detail-content">
					<Space direction="vertical" size="small" style={{ display: 'flex' }}>
						<div id='base-info' style={{ paddingTop: '16px' }}>
							<Card title="报修详情"  >
								<Descriptions labelStyle={labelStyle}>
									<Item label="报修区域">{baseInfo?.isPublic ? '公区报修' : '户内报修'}</Item>
									<Item label="报修位置">{baseInfo?.address}</Item>
									<Item label="报修地点">{baseInfo?.place}</Item>
									<Item label="报修人">{baseInfo?.customerName}</Item>
									<Item label="联系电话">{baseInfo?.phone}</Item>
									<Item label="报修来源">{baseInfo?.sourceTypeStr}</Item>
									<Item label="预约时间">{baseInfo?.appointmentTime ? moment(baseInfo?.appointmentTime).format('YYYY/MM/DD HH:mm') : ''}</Item>
									<Item label="录单人">{baseInfo?.createEmployName}</Item>
									<Item label="录单时间">{baseInfo?.submitTime ? moment(baseInfo?.submitTime).format('YYYY/MM/DD HH:mm') : ''}</Item>
									<Item label="报修详情">{baseInfo?.details}</Item>
								</Descriptions>
								<Descriptions labelStyle={labelStyle}>
									<Item label="图片">
										{renderItem(baseInfo?.attachments)}
									</Item>
								</Descriptions >
							</Card>
						</div>

						<Card title="派工详情" id="dispatch-info">
							<Table
								rowKey='id'
								columns={dispatchColumns}
								scroll={{ x: '100%' }}
								dataSource={dispatchList}
								pagination={false}
							/>
						</Card>

						{((otherBtns.findIndex(item => [BtnIdEnum.领料, BtnIdEnum.退料].includes(item.buttonType)) > -1) || materialsList?.length > 0) &&
							<Card title="维修材料" id="fix-info">
								<Table
									rowKey='id'
									columns={fixColumns}
									scroll={{ x: '100%' }}
									dataSource={materialsList}
									pagination={false}
									summary={() => (
										<Table.Summary fixed>
											{(materialsList.length > 0) && <Table.Summary.Row>
												<Table.Summary.Cell index={0}>合计</Table.Summary.Cell>
												<Table.Summary.Cell index={1}></Table.Summary.Cell>
												<Table.Summary.Cell index={2}></Table.Summary.Cell>
												<Table.Summary.Cell index={3}></Table.Summary.Cell>
												<Table.Summary.Cell index={4}></Table.Summary.Cell>
												<Table.Summary.Cell index={5} align="right">{totalNumber}</Table.Summary.Cell>
												<Table.Summary.Cell index={6} align="right">{totalAmount.toFixed(2)}</Table.Summary.Cell>
												<Table.Summary.Cell index={7}></Table.Summary.Cell>
											</Table.Summary.Row>}
										</Table.Summary>
									)}
								/>
							</Card>}

						{((otherBtns.findIndex(item => [BtnIdEnum.添加费用, BtnIdEnum.删除费用].includes(item.buttonType)) > -1) || dispatchChargesList?.length > 0) &&
							<Card title="服务费用" id="service-charge">
								<Table
									rowKey='id'
									columns={serviceColumns}
									scroll={{ x: '100%' }}
									dataSource={dispatchChargesList}
									pagination={false}
									summary={() => (
										<Table.Summary fixed>
											{(dispatchChargesList.length > 0) && <Table.Summary.Row>
												<Table.Summary.Cell index={0}>合计</Table.Summary.Cell>
												<Table.Summary.Cell index={1}></Table.Summary.Cell>
												<Table.Summary.Cell index={2}></Table.Summary.Cell>
												<Table.Summary.Cell index={3}></Table.Summary.Cell>
												<Table.Summary.Cell index={4} align="right">{total.toFixed(2)}</Table.Summary.Cell>
												<Table.Summary.Cell index={5}></Table.Summary.Cell>
												<Table.Summary.Cell index={6}></Table.Summary.Cell>
											</Table.Summary.Row>}
										</Table.Summary>
									)}
								/>
							</Card>}

						{(['待回访', '待评价'].includes(baseInfo?.repairStatusStr) || returnVisitList?.length > 0) &&
							<Card title="客户评价" id="customer-back">
								<Table
									rowKey='id'
									columns={customerColumns}
									scroll={{ x: '100%' }}
									dataSource={returnVisitList}
									pagination={false}
								/>
							</Card>}

						<Card title="处理记录" id="record">
							<Table
								rowKey='id'
								columns={recordColumns}
								scroll={{ x: '100%' }}
								dataSource={!isExpand ? historiesList.slice(0, 5) : historiesList}
								pagination={false}
							/>
							{(historiesList.length > 5 && !isExpand) && <div style={{ textAlign: 'end', marginTop: '10px' }}>
								<a onClick={() => setIsExpand(true)}>展示全部</a>
							</div>}
							{(historiesList.length > 5 && isExpand) && <div style={{ textAlign: 'end', marginTop: '10px' }}>
								<a onClick={() => setIsExpand(false)}>收起</a>
							</div>}
						</Card>
					</Space>
				</div>

				<ActionModal
					actionModalInfo={actionModalInfo}
					setActionModalInfo={setActionModalInfo}
					reLoad={reLoad}
					closeWrapDrawer={closeDrawer}
				/>
				<Modal
					visible={previewVisible}
					footer={null}
					onCancel={() => {
						setPreviewVisible(false);
					}}
					getContainer={() => {
						return document.getElementById('modal_zindex') || document.body;
					}}
				>
					<img alt="example" style={{ width: '100%', marginTop: '30px' }} src={previewImage} />
				</Modal>
			</Spin>
		</Drawer>
	)
}

export default WorkOrderDetailDraw;