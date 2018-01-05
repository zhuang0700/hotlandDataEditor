#!/usr/bin/python
# -*- coding: utf-8 -*-
from cubemodels.models import AdDataCube, SupplyTagInfo, AdRequestStatistics, MediaInfo
from operation_record import optype

__author__ = 'weiwenliang'
import sys
from admodels import session
from admodels.models import BidAdCreative, DirectionalConf, SubAccountCompanyInfo, BidAdGroup, BidAdAsset, \
    BidAdCampaign, AdEffectDetail, SubAccountDirect, Account, SubAccountAgent, AccountCompanyInfo, \
    UserDirectionPackageRecord, CustomerBudget, UserOperationRecord
from sqlalchemy import func
from sqlalchemy import or_


# def get_history_by_creative_id(creative_id, before_day):
#     ad_data = diagnose_session.query(EffectiveAdRealtime.date,
#                             (func.sum(EffectiveAdRealtime.num)).label('num')) \
#         .filter(EffectiveAdRealtime.date >= before_day) \
#         .filter(EffectiveAdRealtime.ad_creative_id == creative_id).all()
#
#     return ad_data


def get_creative_by_id(creative_id):
    ad_creative = diagnose_session.query(BidAdCreative.id.label('id'),
                                        BidAdCreative.placement_type.label('placement_type'),
                                        BidAdCreative.name.label('name'),
                                        BidAdCreative.ad_group_id.label('ad_group_id'),
                                        BidAdCreative.product.label('product'),
                                        BidAdCreative.bid.label('bid'),
                                        BidAdCreative.extra.label('extra'),
                                        BidAdCreative.status.label('status'),
                                        BidAdCreative.billing_type.label('billing_type'),
                                        BidAdCreative.create_time.label('create_time'),
                                        BidAdCreative.bid.label('bid'),).filter(BidAdCreative.id == creative_id).first()
    return ad_creative


def get_by_username_and_password(username, password):
    user = session.query(User.id.label('id'),
                         )
    return ad_creative
#
#
# def get_creative_by_id(creative_id):
#     ad_creative = BidAdCreative.query.filter(BidAdCreative.id == creative_id).first()
#     return ad_creative


def query_creative_by_name(creative_name):
    ad_creatives = diagnose_session.query(BidAdCreative.id.label('id'),
                                         BidAdCreative.name.label('name'),
                                         ).filter(BidAdCreative.name.like(creative_name)).all()
    return ad_creatives


def query_creative_by_id_range(min_id, max_id):
    ad_creatives = diagnose_session.query(BidAdCreative.id.label('id'),
                                          BidAdCreative.name.label('name'),
                                          ).filter(BidAdCreative.id >= min_id).filter(BidAdCreative.id <= max_id).all()
    return ad_creatives


def get_group_by_id(group_id):
    ad_group = diagnose_session.query(BidAdGroup.id.label('id'),
                                      BidAdGroup.ad_campaign_id.label('ad_campaign_id'),
                                      BidAdGroup.billing_type.label('billing_type'),
                                      BidAdGroup.product.label('product'),
                                      BidAdGroup.bid.label('bid'),
                                      BidAdGroup.directional_conf_id.label('directional_conf_id'),
                                      BidAdGroup.status.label('status'),).filter(BidAdGroup.id == group_id,).first()
    return ad_group


def get_campaign_by_id(campaign_id):
    ad_campaign = diagnose_session.query(BidAdCampaign.id.label('id'),
                                        BidAdCampaign.name.label('name'),
                                        BidAdCampaign.customer_id.label('customer_id'),
                                        BidAdCampaign.status.label('status'),
                                        BidAdCampaign.day_threshold.label('day_threshold'),
                                        BidAdCampaign.start_time.label('start_time'),
                                        BidAdCampaign.end_time.label('end_time'),
                                        BidAdCampaign.create_time.label('create_time'),).filter(BidAdCampaign.id == campaign_id,).first()
    return ad_campaign


def get_assets_by_creativeid(creative_id):
    ad_assets = diagnose_session.query(BidAdAsset.id.label('id'),
                                       BidAdAsset.status.label('status'),
                                       BidAdAsset.img.label('img'),
                                       BidAdAsset.level.label('level'),
                                       BidAdAsset.check_remark.label('check_remark'),
                                       BidAdAsset.ad_creative_id.label('ad_creative_id'),
                                       ).filter(BidAdAsset.ad_creative_id == creative_id).all()
    return ad_assets


def get_direction_by_id(direction_id):
    direction_conf = diagnose_session.query(DirectionalConf.id.label('id'),
                                             DirectionalConf.time_span_list.label('time_span_list'),
                                             DirectionalConf.city_list.label('city_list'),
                                             DirectionalConf.province_list.label('province_list'),
                                            DirectionalConf.age_span_list.label('age_span_list'),
                                            DirectionalConf.media_type_list.label('media_type_list'),
                                            DirectionalConf.interest_tag_list.label('interest_tag_list'),
                                            DirectionalConf.network_list.label('network_list'),
                                            DirectionalConf.tag.label('tag'),
                                            DirectionalConf.sex.label('sex'),
                                            DirectionalConf.label_ext.label('label_ext'),
                                            ).filter(DirectionalConf.id == direction_id,).first()
    return direction_conf


def get_subaccount_company_info_by_id(sub_account_id):
    sub_account_company_info = diagnose_session.query(SubAccountCompanyInfo.id.label('id'),
                                                      SubAccountCompanyInfo.sub_account_id.label('sub_account_id'),
                                                      SubAccountCompanyInfo.company_name.label('company_name'),
                                                      ).filter(SubAccountCompanyInfo.sub_account_id == sub_account_id,).first()
    return sub_account_company_info


def get_account_company_info_by_id(account_id):
    account_company_info = diagnose_session.query(AccountCompanyInfo.id.label('id'),
                                                      AccountCompanyInfo.account_id.label('account_id'),
                                                      AccountCompanyInfo.company_name.label('company_name'),
                                                      ).filter(AccountCompanyInfo.account_id == account_id,).first()
    return account_company_info


def get_operation_record(creative_id, group_id, campaign_id, ad_assets_ids, operate_type, start_date, end_date, page_no, page_size):
    # print("before get operation record:", creative_id, group_id, campaign_id, ad_assets_ids, customer_id, operate_type, start_date, end_date, page_no, page_size)
    try:
        q = diagnose_session.query(UserOperationRecord)

        q = q.filter(or_(UserOperationRecord.asset_id.in_(ad_assets_ids), UserOperationRecord.ad_creative_id == creative_id,
                         UserOperationRecord.ad_group_id == group_id,
                         UserOperationRecord.campaign_id == campaign_id))
        if(operate_type):
            q = q.filter(UserOperationRecord.operation_type.in_(operate_type))
        if(start_date):
            q = q.filter(UserOperationRecord.operation_time >= start_date)
        if(end_date):
            q = q.filter(UserOperationRecord.operation_time < end_date)
        q = q.order_by(UserOperationRecord.operation_time.desc())
        operation_record = q.all()
        print(str(q))
        return operation_record
    except Exception, e:
        print(e)
        diagnose_session.roll_back()
        return None
    # operation_record = q.all()


def get_operation_record_account_only(customer_id, operate_type, start_date, end_date, page_no, page_size):
    # print("before get operation record:", creative_id, group_id, campaign_id, ad_assets_ids, operate_type, start_date, end_date, page_no, page_size)
    sub_account_id = customer_id / 10
    sub_account_type = customer_id % 10
    try:
        q = diagnose_session.query(UserOperationRecord)

        q = q.filter(UserOperationRecord.asset_id <= 0).filter(UserOperationRecord.ad_creative_id <= 0).\
            filter(UserOperationRecord.ad_group_id <=0).filter(UserOperationRecord.campaign_id <=0).\
            filter(UserOperationRecord.sub_account_id == sub_account_id,
                   UserOperationRecord.sub_account_type == sub_account_type)
        q = q.filter(UserOperationRecord.operation_type == optype.SUB_ACCOUNT_THRESHOLD_CHANGE.id)
        if(operate_type):
            q = q.filter(UserOperationRecord.operation_type.in_(operate_type))
        if(start_date):
            q = q.filter(UserOperationRecord.operation_time >= start_date)
        if(end_date):
            q = q.filter(UserOperationRecord.operation_time < end_date)
        q = q.order_by(UserOperationRecord.operation_time.desc())
        operation_record = q.all()
        return operation_record
    except Exception, e:
        print(e)
        diagnose_session.roll_back()
        return None
        # operation_record = q.all()


def get_effect_detail_by_creative(creative_id, start_record_date, end_record_date):
    effect_detail = diagnose_session.query(func.sum(AdEffectDetail.cost).label("cost")).\
        filter(AdEffectDetail.record_date >= start_record_date).\
        filter(AdEffectDetail.record_date < end_record_date).\
        filter(AdEffectDetail.ad_creative_id == creative_id). \
        filter(AdEffectDetail.province == None). \
        filter(AdEffectDetail.city == None). \
        filter(AdEffectDetail.education == None). \
        filter(AdEffectDetail.sex == None). \
        filter(AdEffectDetail.age_span == None). \
        filter(AdEffectDetail.media_type == None). \
        first()
    return effect_detail


def get_effect_detail_by_campaign(campaign_id, start_record_date, end_record_date):
    effect_detail = diagnose_session.query(func.sum(AdEffectDetail.cost).label("cost")).\
        join(BidAdCreative, AdEffectDetail.ad_creative_id == BidAdCreative.id).\
        join(BidAdGroup, BidAdCreative.ad_group_id == BidAdGroup.id). \
        filter(AdEffectDetail.record_date >= start_record_date). \
        filter(AdEffectDetail.record_date < end_record_date). \
        filter(BidAdGroup.ad_campaign_id == campaign_id). \
        filter(AdEffectDetail.province == None). \
        filter(AdEffectDetail.city == None). \
        filter(AdEffectDetail.education == None). \
        filter(AdEffectDetail.sex == None). \
        filter(AdEffectDetail.age_span == None). \
        filter(AdEffectDetail.media_type == None). \
        first()
    return effect_detail


def get_customer_budget(customerId):
    customer_budget = diagnose_session.query(CustomerBudget.id.label('id'),
                                             CustomerBudget.customer_id.label('customer_id'),
                                             CustomerBudget.day_threshold.label('day_threshold')). \
        filter(CustomerBudget.customer_id == customerId).first()
    return customer_budget


def get_user_direction_package(tag_names):
    user_direction_packages = diagnose_session.query(UserDirectionPackageRecord.id.label('id'),
                                                     UserDirectionPackageRecord.tag_name.label('tag_name'),
                                                     UserDirectionPackageRecord.package_name.label('package_name'),
                                                     UserDirectionPackageRecord.start_time.label('start_time'),
                                                     UserDirectionPackageRecord.end_time.label('end_time')). \
        filter(UserDirectionPackageRecord.tag_name.in_(tag_names)).all()

    return user_direction_packages


def get_history_data_list(ad_id, start_date, media_type, tag_id, group_by_mode):
    query = cube_session.query(AdDataCube.record_date, AdDataCube.emi_media_type,
                          func.sum(AdDataCube.fee_cash_back + AdDataCube.fee_cash + AdDataCube.fee_coupon).label(
                              'consume'), (func.sum(AdDataCube.impression)).label('impression'),
                          (func.sum(AdDataCube.click)).label('click'),
                          (func.sum(AdDataCube.start_download)).label('start_download'),
                          SupplyTagInfo.ssp_media_type.label('media_name'),
                            SupplyTagInfo.tag_id) \
        .outerjoin(SupplyTagInfo, AdDataCube.supply_tag_id == SupplyTagInfo.tag_id).filter(AdDataCube.ad_id == ad_id) \
        .filter(AdDataCube.record_date >= start_date)
    if media_type >= 0:
        query = query.filter(AdDataCube.emi_media_type == media_type)
    if tag_id and tag_id != 'all':
        query = query.filter(AdDataCube.supply_tag_id == tag_id)
    if group_by_mode == "media":
        query = query.group_by(AdDataCube.emi_media_type)
    elif group_by_mode == "tag":
        query = query.group_by(AdDataCube.supply_tag_id)
    query = query.group_by(AdDataCube.record_date)
    # print >> sys.stderr, str(query)
    return query.all()


def get_account_by_id(customer_id):
    sub_account_id=customer_id//10
    sub_account_type=customer_id%10
    if(sub_account_type==1):
        #直客
        sub_account_direct = diagnose_session.query(SubAccountDirect).filter(SubAccountDirect.id==sub_account_id).first()
        account = diagnose_session.query(Account).filter(Account.id==sub_account_direct.account_id).first()
        return (sub_account_direct, None,account)
    elif(sub_account_type==2):
        #代理子账号
        sub_account_agent = diagnose_session.query(SubAccountAgent).filter(SubAccountAgent.id==sub_account_id).first()
        account = diagnose_session.query(Account).filter(Account.id==sub_account_agent.account_id).first()
        return (None, sub_account_agent, account)


def get_request_statistics(ad_id, media_name, tag_id, start_time, end_time):
    request_statistics = cube_session.query(AdRequestStatistics). \
        filter(AdRequestStatistics.ad_id == ad_id).\
        filter(AdRequestStatistics.request_time >= start_time).\
        filter(AdRequestStatistics.request_time < end_time)
    if media_name and media_name != 'all':
        request_statistics = request_statistics.filter(AdRequestStatistics.media_name == media_name)
    if tag_id and tag_id != 'all':
        request_statistics = request_statistics.filter(AdRequestStatistics.tag_id == tag_id)
    return request_statistics.all()


def get_all_media_info():
    media_info = cube_session.query(MediaInfo).all()
    return media_info


def get_all_tag_ids():
    tag_ids = cube_session.query(SupplyTagInfo).all()
    return tag_ids


def main():
    pass


if __name__ == '__main__':
    reload(sys)
    sys.setdefaultencoding('utf-8')

    main()
