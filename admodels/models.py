#!/usr/bin/python
# -*- coding: utf-8 -*-
import os
import sys

basedir = os.path.abspath(os.path.dirname(__file__))
sys.path.append(basedir + '/../')

from admodels import db

__author__ = "RuanYongliu"
__date__ = "17/2/22 下午4:48"



class UserOperationRecord(db.Model):
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)
    ip = db.Column(db.String)
    operation_type = db.Column(db.Integer)
    operation_time = db.Column(db.DateTime)
    account_id = db.Column(db.Integer)
    sub_account_id = db.Column(db.Integer)
    sub_account_type = db.Column(db.Integer)
    campaign_id = db.Column(db.Integer)
    ad_group_id = db.Column(db.Integer)
    ad_creative_id = db.Column(db.Integer)
    asset_id = db.Column(db.Integer)
    old_value = db.Column(db.String)
    new_value = db.Column(db.String)
    remark = db.Column(db.String)
    create_time = db.Column(db.DateTime)
    update_time = db.Column(db.DateTime)
    
    
class SubAccountAgent(db.Model):
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.BigInteger, primary_key=True)
    account_id = db.Column(db.BigInteger)
    day_threshold = db.Column(db.BigInteger)
    balance = db.Column(db.BigInteger)
    coupon_balance = db.Column(db.BigInteger)
    cash_back_balance = db.Column(db.BigInteger)
    virtual_coupon_balance = db.Column(db.BigInteger)
    charge_coupon_balance = db.Column(db.BigInteger)
    industry_level1 = db.Column(db.Integer)
    industry_level2 = db.Column(db.Integer)
    create_time = db.Column(db.DateTime)
    status = db.Column(db.Integer)

    def __repr__(self):
        return 'SubAccountAgent: (%d %d %d %d %d %d %s %d)' % (
            self.id,
            self.account_id, self.day_threshold,
            self.balance, self.coupon_balance,
            self.cash_back_balance, self.create_time,
            self.status)


class SubAccountCompanyInfo(db.Model):
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.BigInteger, primary_key=True)
    sub_account_id = db.Column(db.BigInteger)
    company_name = db.Column(db.String)


class SubAccountDirect(db.Model):
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.BigInteger, primary_key=True)
    account_id = db.Column(db.BigInteger)
    day_threshold = db.Column(db.BigInteger)
    balance = db.Column(db.BigInteger)
    coupon_balance = db.Column(db.BigInteger)
    cash_back_balance = db.Column(db.BigInteger)
    virtual_coupon_balance = db.Column(db.BigInteger)
    charge_coupon_balance = db.Column(db.BigInteger)
    industry_level1 = db.Column(db.Integer)
    industry_level2 = db.Column(db.Integer)
    create_time = db.Column(db.DateTime)

    def __repr__(self):
        return 'SubAccountDirect: (%d %d %d %d %d %d %s)' % (
            self.id,
            self.account_id, self.day_threshold,
            self.balance, self.coupon_balance,
            self.cash_back_balance, self.create_time)


class Account(db.Model):
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.BigInteger, primary_key=True)
    xiaomi_id = db.Column(db.BigInteger)
    type = db.Column(db.Integer)
    core_agent_id = db.Column(db.BigInteger)
    balance = db.Column(db.BigInteger)
    coupon_balance = db.Column(db.BigInteger)
    cash_back_balance = db.Column(db.BigInteger)
    status = db.Column(db.Integer)
    # v_coupon_balance = db.Column(db.BigInteger)


class CoreAccount(db.Model):
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.BigInteger, primary_key=True)
    xiaomi_id = db.Column(db.BigInteger)
    balance = db.Column(db.BigInteger)
    coupon_balance = db.Column(db.BigInteger)
    cash_back_balance = db.Column(db.BigInteger)
    # v_coupon_balance = db.Column(db.BigInteger)


class CompanyNameInfo(db.Model):
    __table_args__ = {'extend_existing': True}
    xiaomi_id = db.Column(db.BigInteger, primary_key=True)
    company_name = db.Column(db.String)


class SubAccountBalanceForMediaType(db.Model):
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.BigInteger, primary_key=True)
    sub_account_id = db.Column(db.BigInteger)
    sub_account_type = db.Column(db.Integer)
    balance_type = db.Column(db.Integer)
    media_type = db.Column(db.Integer)
    amount = db.Column(db.BigInteger)


class AccountBalanceForMediaType(db.Model):
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.BigInteger, primary_key=True)
    account_id = db.Column(db.BigInteger)
    account_type = db.Column(db.Integer)
    balance_type = db.Column(db.Integer)
    media_type = db.Column(db.Integer)
    amount = db.Column(db.BigInteger)


class Campaign(db.Model):
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.BigInteger, primary_key=True)
    name = db.Column(db.String)
    sub_account_id = db.Column(db.BigInteger)
    sub_account_type = db.Column(db.Integer)
    status = db.Column(db.Integer)
    day_threshold = db.Column(db.BigInteger)
    start_time = db.Column(db.Date)
    end_time = db.Column(db.Date)
    create_time = db.Column(db.DateTime)

    def __repr__(self):
        return 'Campaign: (%d %d %d %d %s)' % (
            self.id, self.sub_account_id, self.sub_account_type, self.day_threshold, self.create_time)


class AdCreative(db.Model):
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.BigInteger, primary_key=True)
    campaign_id = db.Column(db.BigInteger)
    name = db.Column(db.String)
    billing_type = db.Column(db.Integer)
    bid = db.Column(db.BigInteger)
    material_id = db.Column(db.BigInteger)
    directional_conf_id = db.Column(db.BigInteger)


class AdMaterial(db.Model):
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.BigInteger, primary_key=True)
    placement_type = db.Column(db.Integer)
    text1 = db.Column(db.String)
    text2 = db.Column(db.String)
    text3 = db.Column(db.String)
    landing_page_url1 = db.Column(db.String)
    tag = db.Column(db.String)


class BidAdAsset(db.Model):
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.BigInteger, primary_key=True)
    status = db.Column(db.Integer)
    name = db.Column(db.String)
    ad_creative_id = db.Column(db.BigInteger)
    product = db.Column(db.String)
    text = db.Column(db.String)
    img = db.Column(db.String)
    level = db.Column(db.Integer)
    check_remark = db.Column(db.String)


class BidAdCampaign(db.Model):
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.BigInteger, primary_key=True)
    name = db.Column(db.String)
    customer_id = db.Column(db.BigInteger)
    status = db.Column(db.Integer)
    day_threshold = db.Column(db.BigInteger)
    start_time = db.Column(db.DateTime)
    end_time = db.Column(db.DateTime)
    create_time = db.Column(db.DateTime)

    def __repr__(self):
        return 'BidAdCampaign: (%d %d %d %s)' % (
            self.id, self.customer_id, self.day_threshold, self.create_time)


class BidAdGroup(db.Model):
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.BigInteger, primary_key=True)
    ad_campaign_id = db.Column(db.BigInteger)
    billing_type = db.Column(db.Integer)
    bid = db.Column(db.BigInteger)
    product = db.Column(db.String)
    directional_conf_id = db.Column(db.BigInteger)
    status = db.Column(db.Integer)


class BidAdCreative(db.Model):
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.BigInteger, primary_key=True)
    name = db.Column(db.String)
    placement_type = db.Column(db.Integer)
    ad_group_id = db.Column(db.BigInteger)
    billing_type = db.Column(db.Integer)
    bid = db.Column(db.BigInteger)
    product = db.Column(db.String)
    extra = db.Column(db.String)
    status = db.Column(db.Integer)
    create_time = db.Column(db.DateTime)


class SubAccountMigrateRecord(db.Model):
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.BigInteger, primary_key=True)
    sub_account_id = db.Column(db.BigInteger)
    sub_account_type = db.Column(db.Integer)
    origin_account_id = db.Column(db.BigInteger)
    target_account_id = db.Column(db.BigInteger)
    refund_balance = db.Column(db.BigInteger)
    refund_coupon = db.Column(db.BigInteger)
    refund_cash_back = db.Column(db.BigInteger)
    balance = db.Column(db.BigInteger)
    migrate_balance = db.Column(db.BigInteger)
    operator_miid = db.Column(db.BigInteger)
    create_time = db.Column(db.DateTime)
    update_time = db.Column(db.DateTime)
    consume_when_migrate = db.Column(db.BigInteger)

    def __repr__(self):
        return """sub_account_migrate_record: (
            id = %d
            sub_account_id = %d
            sub_account_type = %d
            origin_account_id = %d
            target_account_id = %d
            refund_balance = %d
            refund_coupon = %d
            refund_cash_back = %d
            balance = %d
            migrate_balance = %d
            operator_miid = %d
            create_time = %s
            update_time = %s
            consume_when_migrate = %d
        )""" % (
            self.id, self.sub_account_id, self.sub_account_type,
            self.origin_account_id, self.target_account_id, self.refund_balance,
            self.refund_coupon, self.refund_cash_back, self.balance,
            self.migrate_balance, self.operator_miid, self.create_time,
            self.update_time, self.consume_when_migrate)


class PublicityMessage(db.Model):
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.BigInteger, primary_key=True)
    contact_name = db.Column(db.String)
    telephone = db.Column(db.String)
    province = db.Column(db.String)
    company_name = db.Column(db.String)
    industry = db.Column(db.String)
    website = db.Column(db.String)
    contact_email = db.Column(db.String)
    commit_time = db.Column(db.Date)

    def __repr__(self):
        return 'PublicityMessage: (%d %s %s %s %s %s %s %s %s)' % (
            self.id,
            self.contact_name, self.telephone,
            self.province, self.company_name,
            self.industry, self.website,
            self.contact_email, self.commit_time)


class DirectionalConf(db.Model):
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)
    time_span_list = db.Column(db.String)
    city_list = db.Column(db.String)
    province_list = db.Column(db.String)
    sex = db.Column(db.Integer)
    installed = db.Column(db.Integer)
    included_appid_list = db.Column(db.String)
    excluded_appid_list = db.Column(db.String)
    age_span_list = db.Column(db.String)
    education_list = db.Column(db.String)
    media_type_list = db.Column(db.String)
    ua_id_list = db.Column(db.String)
    tag = db.Column(db.String)
    value = db.Column(db.String)
    create_time = db.Column(db.DateTime)
    update_time = db.Column(db.DateTime)
    interest_tag_list = db.Column(db.String)
    device_list = db.Column(db.String)
    miui_version_list = db.Column(db.String)
    mobile_corp_list = db.Column(db.String)
    network_list = db.Column(db.String)
    media_category_list = db.Column(db.String)
    upgrade_app_list = db.Column(db.String)
    label_ext = db.Column(db.String)

    def __repr__(self):
        return """directional_conf: (
            id = %s
            time_span_list = %s
            city_list = %s
            province_list = %s
            sex = %s
            installed = %s
            included_appid_list = %s
            excluded_appid_list = %s
            age_span_list = %s
            education_list = %s
            media_type_list = %s
            ua_id_list = %s
            tag = %s
            value = %s
            create_time = %s
            update_time = %s
            interest_tag_list = %s
            device_list = %s
            miui_version_list = %s
            mobile_corp_list = %s
            network_list = %s
            media_category_list = %s
            upgrade_app_list = %s
            label_ext = %s
        )""" % (
            self.id, self.time_span_list, self.city_list,
            self.province_list, self.sex, self.installed,
            self.included_appid_list, self.excluded_appid_list, self.age_span_list,
            self.education_list, self.media_type_list, self.ua_id_list,
            self.tag, self.value, self.create_time,
            self.update_time, self.interest_tag_list, self.device_list,
            self.miui_version_list, self.mobile_corp_list, self.network_list,
            self.media_category_list, self.upgrade_app_list, self.label_ext)


class AccountCompanyInfo(db.Model):
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.BigInteger, primary_key=True)
    account_id = db.Column(db.BigInteger)
    company_name = db.Column(db.String)
    license_no = db.Column(db.String)
    license_pic_url = db.Column(db.String)
    website_name = db.Column(db.String)
    icp_pic_url = db.Column(db.String)
    tax_id = db.Column(db.String)
    tax_pic_url = db.Column(db.String)
    contacts_email = db.Column(db.String)
    contacts_name = db.Column(db.String)
    mobile_phone = db.Column(db.String)
    telephone = db.Column(db.String)
    address = db.Column(db.String)
    ad_qualification_urls = db.Column(db.String)
    create_time = db.Column(db.DateTime)
    update_time = db.Column(db.DateTime)

    def __repr__(self):
        return """account_company_info: (
            id = %s
            account_id = %s
            company_name = %s
            license_no = %s
            license_pic_url = %s
            website_name = %s
            icp_pic_url = %s
            tax_id = %s
            tax_pic_url = %s
            contacts_email = %s
            contacts_name = %s
            mobile_phone = %s
            telephone = %s
            address = %s
            ad_qualification_urls = %s
            create_time = %s
            update_time = %s
        )""" % (
            self.id, self.account_id, self.company_name,
            self.license_no, self.license_pic_url, self.website_name,
            self.icp_pic_url, self.tax_id, self.tax_pic_url,
            self.contacts_email, self.contacts_name, self.mobile_phone,
            self.telephone, self.address, self.ad_qualification_urls,
            self.create_time, self.update_time)


class CustomerBudget(db.Model):
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.BigInteger, primary_key=True)
    customer_id = db.Column(db.BigInteger)
    day_threshold = db.Column(db.BigInteger)
    status = db.Column(db.Integer)
    day_consume = db.Column(db.BigInteger)
    create_time = db.Column(db.DateTime)
    update_time = db.Column(db.DateTime)
    record_date = db.Column(db.DateTime)

    def __repr__(self):
        return """customer_budget: (
            id = %s
            customer_id = %s
            day_threshold = %s
            status = %s
            day_consume = %s
            create_time = %s
            update_time = %s
            record_date = %s
        )""" % (
            self.id, self.customer_id, self.day_threshold,
            self.status, self.day_consume, self.create_time,
            self.update_time, self.record_date)


class AdEffectDetail(db.Model):
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.BigInteger, primary_key=True)
    ad_creative_id = db.Column(db.BigInteger)
    record_date = db.Column(db.DateTime)
    cost = db.Column(db.BigInteger)
    province = db.Column(db.Integer)
    city = db.Column(db.Integer)
    education = db.Column(db.Integer)
    sex = db.Column(db.Integer)
    age_span = db.Column(db.Integer)
    media_type = db.Column(db.Integer)





class UserDirectionPackageRecord(db.Model):
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.BigInteger, primary_key=True)
    tag_name = db.Column(db.String)
    package_name = db.Column(db.String)
    start_time = db.Column(db.DateTime)
    end_time = db.Column(db.DateTime)


class ChannelPackagePrivilege(db.Model):
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.BigInteger, primary_key=True)
    account_id = db.Column(db.BigInteger)
    app_id = db.Column(db.BigInteger)
    placement_type = db.Column(db.Integer)
    operate_xiaomi_id = db.Column(db.String)
    privilege = db.Column(db.Integer)
    create_time = db.Column(db.DateTime)


class AdAccountFeature(db.Model):
    __table_args__ = {'extend_existing': True}
    __tablename__ = 'ad_account_feature'
    id = db.Column(db.BigInteger, primary_key=True)
    ad_account_id = db.Column(db.BigInteger)
    ad_account_type = db.Column(db.Integer)
    privilege = db.Column(db.String)
    type = db.Column(db.Integer)
    operate_xiaomi_id = db.Column(db.String)
    status = db.Column(db.Integer)
    create_time = db.Column(db.DateTime)

    def __repr__(self):
        return """adAccountFeature: (
            id = %s
            ad_account_id = %s
            ad_account_type = %s
            privilege = %s
            type = %s
            operate_xiaomi_id = %s
            status = %s
            create_time = %s
        )""" % (
            self.id, self.ad_account_id, self.ad_account_type,
            self.privilege, self.type, self.operate_xiaomi_id,
            self.status, self.create_time)