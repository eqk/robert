/*
 * Author: Roman Kovjogin
 * Github: https://github.com/white-wolf-17
 * Copyright (c) 2018.
 */

// https://www.cryptopia.co.nz/Forum/Category/45

import request from 'request';

const crypto = require('crypto');
import map from 'lodash/map';
import {utils} from '../utils';

export class CryptopiaService {

    pairs = [
        'DOT/BTC','LTC/BTC','DOGE/BTC','POT/BTC','FTC/BTC','WSX/BTC','POP/BTC','DOT/LTC'
        ,'DOGE/LTC','POT/LTC','FTC/LTC','WSX/LTC','POP/LTC','DOT/DOGE','POT/DOGE','FTC/DOGE'
        ,'WSX/DOGE','POP/DOGE','DARK/BTC','DARK/LTC','DARK/DOGE','RDD/BTC','RDD/LTC','RDD/DOGE'
        ,'DGB/BTC','DGB/LTC','DGB/DOGE','ARI/BTC','ARI/LTC','ARI/DOGE','BCF/BTC','BCF/LTC'
        ,'BCF/DOGE','BGR/LTC','BGR/DOGE','SONG/BTC','SONG/LTC','SONG/DOGE','SXC/BTC','SXC/LTC'
        ,'SXC/DOGE','LOT/LTC','LOT/DOGE','XMG/BTC','XMG/LTC','XMG/DOGE','RED/LTC','RED/DOGE'
        ,'CCB/LTC','CCB/DOGE','PENG/LTC','PENG/DOGE','CON/BTC','CON/LTC','CON/DOGE','$$$/BTC'
        ,'$$$/LTC','$$$/DOGE','QTL/BTC','QTL/LTC','QTL/DOGE','BSD/BTC','BSD/LTC','BSD/DOGE'
        ,'OK/BTC','OK/LTC','OK/DOGE','RED/BTC','BSTY/BTC','BSTY/LTC','BSTY/DOGE','TIT/BTC'
        ,'TIT/LTC','TIT/DOGE','TTY/BTC','TTY/LTC','TTY/DOGE','XVG/BTC','XVG/LTC','XVG/DOGE'
        ,'TOP/LTC','TOP/DOGE','TOP/BTC','GXG/BTC','GXG/LTC','GXG/DOGE','ORB/BTC','ORB/LTC'
        ,'ORB/DOGE','FTCC/BTC','FTCC/LTC','FTCC/DOGE','GUN/BTC','GUN/LTC','GUN/DOGE','CBX/BTC'
        ,'CBX/LTC','CBX/DOGE','GCN/LTC','GCN/DOGE','MOTO/BTC','MOTO/LTC','MOTO/DOGE','FONZ/BTC'
        ,'FONZ/LTC','FONZ/DOGE','TTC/BTC','TTC/LTC','TTC/DOGE','SPN/LTC','SPN/DOGE','SQL/BTC'
        ,'SQL/LTC','SQL/DOGE','PXC/BTC','PXC/LTC','PXC/DOGE','HBN/BTC','HBN/LTC','HBN/DOGE'
        ,'UNIC/BTC','UNIC/LTC','UNIC/DOGE','ZEIT/LTC','ZEIT/DOGE','UNO/BTC','UNO/LTC','UNO/DOGE'
        ,'OZC/BTC','OZC/LTC','OZC/DOGE','PIGGY/BTC','PIGGY/LTC','PIGGY/DOGE','LEA/BTC','LEA/LTC'
        ,'LEA/DOGE','FUNK/LTC','FUNK/DOGE','BLZ/BTC','BLZ/LTC','BLZ/DOGE','OFF/BTC','OFF/LTC'
        ,'OFF/DOGE','EMC/BTC','EMC/LTC','EMC/DOGE','BUN/LTC','BUN/DOGE','SOON/BTC','SOON/LTC'
        ,'SOON/DOGE','8BIT/BTC','8BIT/LTC','8BIT/DOGE','FLN/LTC','FLN/DOGE','LDOGE/BTC','LDOGE/LTC'
        ,'LDOGE/DOGE','HYP/BTC','HYP/LTC','HYP/DOGE','DEM/BTC','DEM/LTC','DEM/DOGE','IRL/BTC'
        ,'IRL/LTC','IRL/DOGE','SKC/BTC','SKC/LTC','SKC/DOGE','MARS/BTC','MARS/LTC','MARS/DOGE'
        ,'AC/BTC','AC/LTC','AC/DOGE','MEC/BTC','MEC/LTC','MEC/DOGE','PND/BTC','PND/LTC'
        ,'PND/DOGE','RC/BTC','RC/LTC','RC/DOGE','TES/BTC','TES/LTC','TES/DOGE','GDC/LTC'
        ,'GDC/DOGE','SHA/BTC','SHA/LTC','SHA/DOGE','FLAX/BTC','FLAX/LTC','FLAX/DOGE','XPD/BTC'
        ,'XPD/LTC','XPD/DOGE','ANI/BTC','ANI/LTC','ANI/DOGE','DUO/BTC','DUO/LTC','DUO/DOGE'
        ,'PLC/BTC','PLC/LTC','PLC/DOGE','GRW/BTC','GRW/LTC','GRW/DOGE','SJW/BTC','SJW/LTC'
        ,'SJW/DOGE','V/BTC','V/LTC','V/DOGE','NKA/LTC','NKA/DOGE','ADC/BTC','ADC/LTC'
        ,'ADC/DOGE','BNX/BTC','BNX/LTC','BNX/DOGE','CHC/BTC','CHC/LTC','CHC/DOGE','TRK/BTC'
        ,'TRK/LTC','TRK/DOGE','CPN/BTC','CPN/LTC','CPN/DOGE','GAME/BTC','GAME/LTC','GAME/DOGE'
        ,'BGR/BTC','CFC/BTC','CFC/LTC','CFC/DOGE','ELC/BTC','ELC/LTC','ELC/DOGE','SPT/BTC'
        ,'SPT/LTC','SPT/DOGE','SLOTH/LTC','SLOTH/DOGE','WDC/BTC','WDC/LTC','WDC/DOGE','TEK/BTC'
        ,'TEK/LTC','TEK/DOGE','PR/BTC','PR/LTC','PR/DOGE','GDC/BTC','TRI/BTC','TRI/LTC'
        ,'TRI/DOGE','START/BTC','START/LTC','START/DOGE','RBY/BTC','RBY/LTC','RBY/DOGE','EUC/BTC'
        ,'EUC/LTC','EUC/DOGE','PPC/BTC','PPC/LTC','PPC/DOGE','GP/BTC','GP/LTC','GP/DOGE'
        ,'NVC/BTC','NVC/LTC','NVC/DOGE','PAK/BTC','PAK/LTC','PAK/DOGE','DIME/LTC','DIME/DOGE'
        ,'BLK/BTC','BLK/LTC','BLK/DOGE','VRC/BTC','VRC/LTC','VRC/DOGE','PTC/BTC','PTC/LTC'
        ,'PTC/DOGE','PCC/BTC','PCC/LTC','PCC/DOGE','I0C/BTC','I0C/LTC','I0C/DOGE','INFX/BTC'
        ,'INFX/LTC','INFX/DOGE','CANN/BTC','CANN/LTC','CANN/DOGE','CLAM/BTC','CLAM/LTC','CLAM/DOGE'
        ,'XPM/BTC','XPM/LTC','XPM/DOGE','CDN/BTC','CDN/LTC','CDN/DOGE','LFTC/LTC','LFTC/DOGE'
        ,'NET/BTC','NET/LTC','NET/DOGE','MAZA/BTC','MAZA/LTC','MAZA/DOGE','BOLI/LTC','BOLI/DOGE'
        ,'BOLI/BTC','BTCS/BTC','BTCS/LTC','BTCS/DOGE','NYAN/BTC','NYAN/LTC','NYAN/DOGE','EBG/BTC'
        ,'EBG/LTC','EBG/DOGE','GLD/BTC','GLD/LTC','GLD/DOGE','SLG/LTC','SLG/DOGE','SLG/BTC'
        ,'BUMBA/BTC','BUMBA/LTC','BUMBA/DOGE','BTA/BTC','BTA/LTC','BTA/DOGE','AUR/BTC','AUR/LTC'
        ,'AUR/DOGE','BTCD/BTC','BTCD/LTC','BTCD/DOGE','EPC/LTC','EPC/DOGE','BIRD/LTC','BIRD/DOGE'
        ,'STV/BTC','STV/LTC','STV/DOGE','XMY/BTC','XMY/LTC','XMY/DOGE','TRBO/LTC','TRBO/DOGE'
        ,'TRBO/BTC','RBT/BTC','RBT/LTC','RBT/DOGE','EVO/BTC','EVO/LTC','EVO/DOGE','EGC/BTC'
        ,'EGC/LTC','EGC/DOGE','BTB/BTC','BTB/LTC','BTB/DOGE','OSC/BTC','OSC/LTC','OSC/DOGE'
        ,'PHS/BTC','PHS/LTC','PHS/DOGE','EMD/BTC','EMD/LTC','EMD/DOGE','VADE/LTC','VADE/DOGE'
        ,'SWING/BTC','SWING/LTC','SWING/DOGE','DGC/BTC','DGC/LTC','DGC/DOGE','BUCKS/BTC','BUCKS/LTC'
        ,'BUCKS/DOGE','LYNX/LTC','LYNX/DOGE','QRK/BTC','QRK/LTC','QRK/DOGE','EVIL/BTC','EVIL/LTC'
        ,'EVIL/DOGE','CAT/BTC','CAT/LTC','CAT/DOGE','MINT/BTC','MINT/LTC','MINT/DOGE','FST/BTC'
        ,'FST/LTC','FST/DOGE','UMO/BTC','UMO/LTC','UMO/DOGE','UIS/BTC','UIS/LTC','UIS/DOGE'
        ,'BEAN/BTC','BEAN/LTC','BEAN/DOGE','TX/BTC','TX/LTC','TX/DOGE','TRC/BTC','TRC/LTC'
        ,'TRC/DOGE','XCT/BTC','XCT/LTC','XCT/DOGE','NMC/BTC','NMC/LTC','NMC/DOGE','VADE/BTC'
        ,'HAL/BTC','HAL/LTC','HAL/DOGE','XMR/BTC','XMR/LTC','XMR/DOGE','DCR/BTC','DCR/LTC'
        ,'DCR/DOGE','RPC/BTC','RPC/LTC','RPC/DOGE','KUMA/BTC','KUMA/LTC','KUMA/DOGE','NAV/BTC'
        ,'NAV/LTC','NAV/DOGE','FUZZ/BTC','FUZZ/LTC','FUZZ/DOGE','LEAF/LTC','LEAF/DOGE','LTB/LTC'
        ,'LTB/DOGE','MOIN/LTC','MOIN/DOGE','LTB/BTC','MOIN/BTC','NTRN/BTC','NTRN/LTC','NTRN/DOGE'
        ,'BEEZ/BTC','BEEZ/LTC','BEEZ/DOGE','YOVI/BTC','YOVI/LTC','YOVI/DOGE','KED/BTC','KED/LTC'
        ,'KED/DOGE','XBC/BTC','XBC/LTC','XBC/DOGE','IXC/BTC','IXC/LTC','IXC/DOGE','ACOIN/BTC'
        ,'ACOIN/LTC','ACOIN/DOGE','BAT/LTC','BAT/DOGE','FRN/BTC','FRN/LTC','FRN/DOGE','EDRC/BTC'
        ,'EDRC/LTC','EDRC/DOGE','FFC/BTC','FFC/LTC','FFC/DOGE','RBBT/LTC','RBBT/DOGE','BRG/BTC'
        ,'BRG/LTC','BRG/DOGE','LEMON/BTC','LEMON/LTC','LEMON/DOGE','BLC/BTC','BLC/LTC','BLC/DOGE'
        ,'LIT/BTC','LIT/LTC','LIT/DOGE','PHO/LTC','PHO/DOGE','SKR/BTC','SKR/LTC','SKR/DOGE'
        ,'GPL/BTC','GPL/LTC','GPL/DOGE','ARG/BTC','ARG/LTC','ARG/DOGE','TGC/BTC','TGC/LTC'
        ,'TGC/DOGE','BERN/BTC','BERN/LTC','BERN/DOGE','TRUMP/BTC','TRUMP/LTC','TRUMP/DOGE','LYC/LTC'
        ,'LYC/DOGE','CTL/BTC','CTL/LTC','CTL/DOGE','XRA/BTC','XRA/LTC','XRA/DOGE','XRE/BTC'
        ,'XRE/LTC','XRE/DOGE','CLOAK/BTC','CLOAK/LTC','CLOAK/DOGE','MNM/BTC','MNM/LTC','MNM/DOGE'
        ,'SMC/BTC','SMC/LTC','SMC/DOGE','CC/BTC','CC/LTC','CC/DOGE','KRB/BTC','KRB/LTC'
        ,'KRB/DOGE','XJO/BTC','XJO/LTC','XJO/DOGE','ZET/BTC','ZET/LTC','ZET/DOGE','1337/LTC'
        ,'1337/DOGE','AU/BTC','AU/LTC','AU/DOGE','PROUD/BTC','PROUD/LTC','PROUD/DOGE','888/BTC'
        ,'888/LTC','888/DOGE','QBT/BTC','QBT/LTC','QBT/DOGE','NXS/BTC','NXS/LTC','NXS/DOGE'
        ,'808/LTC','808/DOGE','CJ/BTC','CJ/LTC','CJ/DOGE','KDC/BTC','KDC/LTC','KDC/DOGE'
        ,'ETC/BTC','ETC/LTC','ETC/DOGE','EDC/BTC','EDC/LTC','EDC/DOGE','GRN/BTC','GRN/LTC'
        ,'GRN/DOGE','EXP/BTC','EXP/LTC','EXP/DOGE','CRX/BTC','CRX/LTC','CRX/DOGE','CMT/BTC'
        ,'CMT/LTC','CMT/DOGE','BTG/BTC','BTG/LTC','BTG/DOGE','MAC/BTC','MAC/LTC','MAC/DOGE'
        ,'VPRC/BTC','VPRC/LTC','VPRC/DOGE','AGA/BTC','AGA/LTC','AGA/DOGE','LDC/BTC','LDC/LTC'
        ,'LDC/DOGE','POST/BTC','POST/LTC','POST/DOGE','BVB/BTC','BVB/LTC','BVB/DOGE','FJC/BTC'
        ,'FJC/LTC','FJC/DOGE','OPAL/BTC','OPAL/LTC','OPAL/DOGE','EFL/BTC','EFL/LTC','EFL/DOGE'
        ,'LBC/BTC','LBC/LTC','LBC/DOGE','FCT/BTC','FCT/LTC','FCT/DOGE','BENJI/BTC','BENJI/LTC'
        ,'BENJI/DOGE','KASH/BTC','KASH/LTC','KASH/DOGE','SPACE/BTC','SPACE/LTC','SPACE/DOGE','VRM/BTC'
        ,'VRM/LTC','VRM/DOGE','PIVX/BTC','PIVX/LTC','PIVX/DOGE','GRS/BTC','GRS/LTC','GRS/DOGE'
        ,'GAP/BTC','GAP/LTC','GAP/DOGE','CCN/BTC','CCN/LTC','CCN/DOGE','FLT/BTC','FLT/LTC'
        ,'FLT/DOGE','COAL/BTC','COAL/LTC','COAL/DOGE','XZC/BTC','XZC/LTC','XZC/DOGE','MST/BTC'
        ,'MST/LTC','MST/DOGE','ATOM/BTC','ATOM/LTC','ATOM/DOGE','EMB/LTC','EMB/DOGE','ARC/BTC'
        ,'ARC/LTC','ARC/DOGE','UR/BTC','UR/LTC','UR/DOGE','Q2C/BTC','Q2C/LTC','Q2C/DOGE'
        ,'ZEC/BTC','ZEC/LTC','ZEC/DOGE','BIP/BTC','BIP/LTC','BIP/DOGE','WW/BTC','WW/LTC'
        ,'WW/DOGE','ZCL/BTC','ZCL/LTC','ZCL/DOGE','ZOI/BTC','ZOI/LTC','ZOI/DOGE','VCC/BTC'
        ,'VCC/LTC','VCC/DOGE','STRAT/BTC','STRAT/LTC','STRAT/DOGE','HUSH/BTC','HUSH/LTC','HUSH/DOGE'
        ,'CQST/BTC','CQST/LTC','CQST/DOGE','BOSON/LTC','BOSON/DOGE','SIB/BTC','SIB/LTC','SIB/DOGE'
        ,'ARCO/BTC','ARCO/LTC','ARCO/DOGE','LOOK/LTC','LOOK/DOGE','IN/BTC','IN/LTC','IN/DOGE'
        ,'CHESS/BTC','CHESS/LTC','CHESS/DOGE','CAR/BTC','CAR/LTC','CAR/DOGE','CHIEF/LTC','CHIEF/DOGE'
        ,'KOBO/BTC','KOBO/LTC','KOBO/DOGE','SEL/BTC','SEL/LTC','SEL/DOGE','NLX/BTC','NLX/LTC'
        ,'NLX/DOGE','OOO/BTC','OOO/LTC','OOO/DOGE','42/BTC','42/LTC','42/DOGE','ERY/BTC'
        ,'ERY/LTC','ERY/DOGE','DON/BTC','DON/LTC','DON/DOGE','NEVA/BTC','NEVA/LTC','NEVA/DOGE'
        ,'LANA/BTC','LANA/LTC','LANA/DOGE','XSPEC/BTC','XSPEC/LTC','XSPEC/DOGE','XBTS/BTC','XBTS/LTC'
        ,'XBTS/DOGE','TAJ/BTC','TAJ/LTC','TAJ/DOGE','MARX/BTC','MARX/LTC','MARX/DOGE','PXI/BTC'
        ,'PXI/LTC','PXI/DOGE','WRC/BTC','WRC/LTC','WRC/DOGE','SFC/BTC','SFC/LTC','SFC/DOGE'
        ,'KMD/BTC','KMD/LTC','KMD/DOGE','KUSH/BTC','KUSH/LTC','KUSH/DOGE','MAR/BTC','MAR/LTC'
        ,'MAR/DOGE','UTC/BTC','UTC/LTC','UTC/DOGE','ALEX/BTC','ALEX/LTC','ALEX/DOGE','ZER/BTC'
        ,'ZER/LTC','ZER/DOGE','ARGUS/BTC','ARGUS/LTC','ARGUS/DOGE','MLITE/BTC','MLITE/LTC','MLITE/DOGE'
        ,'NETKO/BTC','NETKO/LTC','NETKO/DOGE','RNS/BTC','RNS/LTC','RNS/DOGE','BTC/USDT','LTC/USDT'
        ,'DOGE/USDT','XMR/USDT','DOT/USDT','DCR/USDT','ZEC/USDT','NAV/USDT','UNO/USDT','ALL/BTC'
        ,'ALL/LTC','ALL/DOGE','MOJO/BTC','MOJO/LTC','MOJO/DOGE','GEERT/BTC','GEERT/LTC','GEERT/DOGE'
        ,'PASL/BTC','PASL/LTC','PASL/DOGE','BSD/USDT','UBQ/BTC','UBQ/LTC','UBQ/DOGE','MUSIC/BTC'
        ,'MUSIC/LTC','MUSIC/DOGE','SAFEX/BTC','SAFEX/LTC','SAFEX/DOGE','HXX/BTC','HXX/LTC','HXX/DOGE'
        ,'AMP/BTC','AMP/LTC','AMP/DOGE','MAID/BTC','MAID/LTC','MAID/DOGE','ITI/BTC','ITI/LTC'
        ,'ITI/DOGE','ARK/BTC','ARK/LTC','ARK/DOGE','ZSE/BTC','ZSE/LTC','ZSE/DOGE','ARK/USDT'
        ,'ALT/BTC','ALT/LTC','ALT/DOGE','DASH/BTC','DASH/LTC','DASH/DOGE','DASH/USDT','EC/BTC'
        ,'EC/LTC','EC/DOGE','GBYTE/BTC','GBYTE/LTC','GBYTE/DOGE','PUT/BTC','PUT/LTC','PUT/DOGE'
        ,'ECO/BTC','ECO/LTC','ECO/DOGE','SKY/BTC','SKY/LTC','SKY/DOGE','WLC/BTC','WLC/LTC'
        ,'WLC/DOGE','ATMOS/BTC','ATMOS/LTC','ATMOS/DOGE','NOBL/BTC','NOBL/LTC','NOBL/DOGE','PROC/BTC'
        ,'PROC/LTC','PROC/DOGE','PINK/BTC','PINK/LTC','PINK/DOGE','PEPE/BTC','PEPE/LTC','PEPE/DOGE'
        ,'BTX/BTC','BTX/LTC','BTX/DOGE','BTC/NZDT','LTC/NZDT','DOGE/NZDT','XMR/NZDT','DOT/NZDT'
        ,'ZEC/NZDT','NZDT/USDT','RAIN/BTC','RAIN/LTC','RAIN/DOGE','SUMO/BTC','SUMO/LTC','SUMO/DOGE'
        ,'C2/BTC','C2/LTC','C2/DOGE','CREA/BTC','CREA/LTC','CREA/DOGE','SKY/USDT','SKY/NZDT'
        ,'CXT/BTC','CXT/LTC','CXT/DOGE','INSN/BTC','INSN/LTC','INSN/DOGE','XBY/BTC','XBY/LTC'
        ,'XBY/DOGE','FC2/BTC','FC2/LTC','FC2/DOGE','TER/BTC','TER/LTC','TER/DOGE','GNT/BTC'
        ,'GNT/LTC','GNT/DOGE','GNO/BTC','GNO/LTC','GNO/DOGE','XEM/BTC','XEM/LTC','XEM/DOGE'
        ,'CACH/BTC','CACH/LTC','CACH/DOGE','SAND/BTC','SAND/LTC','SAND/DOGE','REP/BTC','REP/LTC'
        ,'REP/DOGE','CRYPT/BTC','CRYPT/LTC','CRYPT/DOGE','DAXX/BTC','DAXX/LTC','DAXX/DOGE','DCY/BTC'
        ,'DCY/LTC','DCY/DOGE','ETH/BTC','ETH/LTC','ETH/DOGE','ETH/USDT','ETH/NZDT','HUSH/USDT'
        ,'HUSH/NZDT','ETC/USDT','ETC/NZDT','FLASH/BTC','FLASH/LTC','FLASH/DOGE','EMC2/BTC','EMC2/LTC'
        ,'EMC2/DOGE','ECOB/BTC','ECOB/LTC','ECOB/DOGE','MNE/BTC','MNE/LTC','MNE/DOGE','TOA/BTC'
        ,'TOA/LTC','TOA/DOGE','LINDA/BTC','LINDA/LTC','LINDA/DOGE','CHAN/BTC','CHAN/LTC','CHAN/DOGE'
        ,'UNIFY/BTC','UNIFY/LTC','UNIFY/DOGE','MAGN/BTC','MAGN/LTC','MAGN/DOGE','DNR/BTC','DNR/LTC'
        ,'DNR/DOGE','SOIL/BTC','SOIL/LTC','SOIL/DOGE','XRY/BTC','XRY/LTC','XRY/DOGE','XCO/BTC'
        ,'XCO/LTC','XCO/DOGE','300/BTC','300/LTC','300/DOGE','611/BTC','611/LTC','611/DOGE'
        ,'XPTX/BTC','XPTX/LTC','XPTX/DOGE','KEK/BTC','KEK/LTC','KEK/DOGE','BAY/BTC','BAY/LTC'
        ,'BAY/DOGE','MINEX/BTC','MINEX/LTC','MINEX/DOGE','MSP/BTC','MSP/LTC','MSP/DOGE','21M/BTC'
        ,'21M/LTC','21M/DOGE','XID/BTC','XID/LTC','XID/DOGE','MGO/BTC','MGO/LTC','MGO/DOGE'
        ,'BNC/BTC','BNC/LTC','BNC/DOGE','DOPE/BTC','DOPE/LTC','DOPE/DOGE','NLC2/BTC','NLC2/LTC'
        ,'NLC2/DOGE','ACC/BTC','ACC/LTC','ACC/DOGE','GRWI/BTC','GRWI/LTC','GRWI/DOGE','LINX/BTC'
        ,'LINX/LTC','LINX/DOGE','SHRM/BTC','SHRM/LTC','SHRM/DOGE','WEED/BTC','WEED/LTC','WEED/DOGE'
        ,'SRC/BTC','SRC/LTC','SRC/DOGE','IFLT/LTC','IFLT/DOGE','BCH/BTC','BCH/LTC','BCH/DOGE'
        ,'BCH/USDT','BCH/NZDT','DRXNE/BTC','DRXNE/LTC','DRXNE/DOGE','DCN/BTC','DCN/LTC','DCN/DOGE'
        ,'PLR/BTC','PLR/LTC','PLR/DOGE','ADST/BTC','ADST/LTC','ADST/DOGE','DDF/BTC','DDF/LTC'
        ,'DDF/DOGE','RIYA/BTC','RIYA/LTC','RIYA/DOGE','DRP/BTC','DRP/LTC','DRP/DOGE','BRO/BTC'
        ,'BRO/LTC','BRO/DOGE','XCXT/BTC','XCXT/LTC','XCXT/DOGE','ABC/BTC','ABC/LTC','ABC/DOGE'
        ,'ABY/BTC','ABY/LTC','ABY/DOGE','OX/BTC','OX/LTC','OX/DOGE','DALC/BTC','DALC/LTC'
        ,'DALC/DOGE','NAMO/BTC','NAMO/LTC','NAMO/DOGE','IFT/BTC','IFT/LTC','IFT/DOGE','KRONE/BTC'
        ,'KRONE/LTC','KRONE/DOGE','LBTC/BTC','LBTC/LTC','LBTC/DOGE','LTCU/BTC','LTCU/LTC','LTCU/DOGE'
        ,'DAS/BTC','DAS/LTC','DAS/DOGE','ETT/BTC','ETT/LTC','ETT/DOGE','XST/BTC','XST/LTC'
        ,'XST/DOGE','SKIN/BTC','SKIN/LTC','SKIN/DOGE','CMPCO/BTC','CMPCO/LTC','CMPCO/DOGE','MYB/BTC'
        ,'MYB/LTC','MYB/DOGE','OMG/BTC','OMG/LTC','OMG/DOGE','PAY/BTC','PAY/LTC','PAY/DOGE'
        ,'DBIX/BTC','DBIX/LTC','DBIX/DOGE','NEO/BTC','NEO/LTC','NEO/DOGE','MBRS/BTC','MBRS/LTC'
        ,'MBRS/DOGE','CRM/BTC','CRM/LTC','CRM/DOGE','RKC/BTC','RKC/LTC','RKC/DOGE','ATH/BTC'
        ,'ATH/LTC','ATH/DOGE','MTNC/BTC','MTNC/LTC','MTNC/DOGE','FANS/BTC','FANS/LTC','FANS/DOGE'
        ,'STRC/BTC','STRC/LTC','STRC/DOGE','NDAO/BTC','NDAO/LTC','NDAO/DOGE','NEBL/BTC','NEBL/LTC'
        ,'NEBL/DOGE','ZEN/BTC','ZEN/LTC','ZEN/DOGE','BDL/BTC','BDL/LTC','BDL/DOGE','XLC/BTC'
        ,'XLC/LTC','XLC/DOGE','WILD/BTC','WILD/LTC','WILD/DOGE','MTL/BTC','MTL/LTC','MTL/DOGE'
        ,'ORME/BTC','ORME/LTC','ORME/DOGE','BKCAT/BTC','BKCAT/LTC','BKCAT/DOGE','BTM/BTC','BTM/LTC'
        ,'BTM/DOGE','NAV/NZDT','XMCC/BTC','XMCC/LTC','XMCC/DOGE','EQT/BTC','EQT/LTC','EQT/DOGE'
        ,'DP/BTC','DP/LTC','DP/DOGE','BOP/BTC','BOP/LTC','BOP/DOGE','IQT/BTC','IQT/LTC'
        ,'IQT/DOGE','XBL/BTC','XBL/LTC','XBL/DOGE','MCI/BTC','MCI/LTC','MCI/DOGE','COR/BTC'
        ,'COR/LTC','COR/DOGE','HAC/BTC','HAC/LTC','HAC/DOGE','HDLB/BTC','HDLB/LTC','HDLB/DOGE'
        ,'KNC/BTC','KNC/LTC','KNC/DOGE','SPR/BTC','SPR/LTC','SPR/DOGE','QWARK/BTC','QWARK/LTC'
        ,'QWARK/DOGE','APX/BTC','APX/LTC','APX/DOGE','KING/BTC','KING/LTC','KING/DOGE','KAYI/BTC'
        ,'KAYI/LTC','KAYI/DOGE','R/BTC','R/LTC','R/DOGE','CEFS/BTC','CEFS/LTC','CEFS/DOGE'
        ,'RICKS/BTC','RICKS/LTC','RICKS/DOGE','ODN/BTC','ODN/LTC','ODN/DOGE','RUP/BTC','RUP/LTC'
        ,'RUP/DOGE','HSR/BTC','HSR/LTC','HSR/DOGE','XGOX/BTC','XGOX/LTC','XGOX/DOGE','BIS/BTC'
        ,'BIS/LTC','BIS/DOGE','HLM/BTC','HLM/LTC','HLM/DOGE','EVR/BTC','EVR/LTC','EVR/DOGE'
        ,'SDRN/BTC','SDRN/LTC','SDRN/DOGE','TIX/BTC','TIX/LTC','TIX/DOGE','ALIS/BTC','ALIS/LTC'
        ,'ALIS/DOGE','CTIC3/BTC','CTIC3/LTC','CTIC3/DOGE','BTDX/BTC','BTDX/LTC','BTDX/DOGE','ELM/BTC'
        ,'ELM/LTC','ELM/DOGE','SCL/BTC','SCL/LTC','SCL/DOGE','SBC/BTC','SBC/LTC','SBC/DOGE'
        ,'DPP/BTC','DPP/LTC','DPP/DOGE','OTN/BTC','OTN/LTC','OTN/DOGE','ENJ/BTC','ENJ/LTC'
        ,'ENJ/DOGE','COMP/LTC','COMP/DOGE','PURA/BTC','PURA/LTC','PURA/DOGE','COPPER/BTC','COPPER/LTC'
        ,'COPPER/DOGE','LUX/BTC','LUX/LTC','LUX/DOGE','PIRL/BTC','PIRL/LTC','PIRL/DOGE','CNO/BTC'
        ,'CNO/LTC','CNO/DOGE','VIVO/BTC','VIVO/LTC','VIVO/DOGE','ONION/BTC','ONION/LTC','ONION/DOGE'
        ,'TZC/BTC','TZC/LTC','TZC/DOGE','ETN/BTC','ETN/LTC','ETN/DOGE','POWR/BTC','POWR/LTC'
        ,'POWR/DOGE','WC/BTC','WC/LTC','WC/DOGE','IZE/BTC','IZE/LTC','IZE/DOGE','INN/BTC'
        ,'INN/LTC','INN/DOGE','HAV/BTC','HAV/LTC','HAV/DOGE','EDDIE/BTC','EDDIE/LTC','EDDIE/DOGE'
        ,'LCP/BTC','LCP/LTC','LCP/DOGE','BPL/BTC','BPL/LTC','BPL/DOGE','HOLD/BTC','HOLD/LTC'
        ,'HOLD/DOGE','ETHD/BTC','ETHD/LTC','ETHD/DOGE','ZAP/BTC','ZAP/LTC','ZAP/DOGE','MGX/BTC'
        ,'MGX/LTC','MGX/DOGE','DGPT/BTC','DGPT/LTC','DGPT/DOGE','PHR/BTC','PHR/LTC','PHR/DOGE'
        ,'XCPO/BTC','XCPO/LTC','XCPO/DOGE','DEUS/BTC','DEUS/LTC','DEUS/DOGE','HC/BTC','HC/LTC'
        ,'HC/DOGE','GBX/BTC','GBX/LTC','GBX/DOGE','POLL/BTC','POLL/LTC','POLL/DOGE','BCPT/BTC'
        ,'BCPT/LTC','BCPT/DOGE','HST/BTC','HST/LTC','HST/DOGE','OPC/BTC','OPC/LTC','OPC/DOGE'
        ,'UNIT/BTC','UNIT/LTC','UNIT/DOGE','MONK/BTC','MONK/LTC','MONK/DOGE','VOISE/BTC','VOISE/LTC'
        ,'VOISE/DOGE','DIVX/BTC','DIVX/LTC','DIVX/DOGE','PLX/BTC','PLX/LTC','PLX/DOGE','PBL/BTC'
        ,'PBL/LTC','PBL/DOGE','BON/BTC','BON/LTC','BON/DOGE','BTX/NZDT','BTX/USDT','ORME/NZDT'
        ,'ORME/USDT','ETN/USDT','ETN/NZDT','HEAT/BTC','HEAT/LTC','HEAT/DOGE','AURS/BTC','AURS/LTC'
        ,'AURS/DOGE','CMP/BTC','CMP/LTC','CMP/DOGE','TOK/BTC','TOK/LTC','TOK/DOGE','KBR/BTC'
        ,'KBR/LTC','KBR/DOGE','DBET/BTC','DBET/LTC','DBET/DOGE','DNA/BTC','DNA/LTC','DNA/DOGE'
        ,'SEND/BTC','SEND/LTC','SEND/DOGE','ELLA/BTC','ELLA/LTC','ELLA/DOGE','BWK/BTC','BWK/LTC'
        ,'BWK/DOGE','PCOIN/BTC','PCOIN/LTC','PCOIN/DOGE','MAGE/BTC','MAGE/LTC','MAGE/DOGE','XVG/USDT'
        ,'XVG/NZDT','SAGA/BTC','SAGA/LTC','SAGA/DOGE','MATRX/BTC','MATRX/LTC','MATRX/DOGE','HBC/BTC'
        ,'HBC/LTC','HBC/DOGE','CRC/BTC','CRC/LTC','CRC/DOGE','NMS/BTC','NMS/LTC','NMS/DOGE'
        ,'STN/BTC','STN/LTC','STN/DOGE','SPANK/BTC','SPANK/LTC','SPANK/DOGE','WISH/BTC','WISH/LTC'
        ,'WISH/DOGE','CAPP/BTC','CAPP/LTC','CAPP/DOGE','UFR/BTC','UFR/LTC','UFR/DOGE','PRL/BTC'
        ,'PRL/LTC','PRL/DOGE','CEFS/NZDT','CEFS/USDT','LUX/NZDT','LUX/USDT','BUN/BTC','DIME/BTC'
        ,'DRPU/BTC','CL/BTC','TRX/BTC','SCT/BTC','CAN/BTC','GEO/BTC','GEO/LTC','GEO/DOGE'
        ,'AC3/BTC','AC3/LTC','AC3/DOGE','IC/BTC','IC/LTC','IC/DOGE','FUTX/BTC','FUTX/LTC'
        ,'FUTX/DOGE','GBX/USDT','$PAC/BTC','$PAC/USDT','CENNZ/BTC','CRAVE/BTC','VUC/BTC','WSP/BTC'
        ,'WSP/LTC','WSP/DOGE','GNR/BTC','GNR/LTC','GNR/DOGE','ORE/BTC','$PAC/LTC','POLIS/BTC'
        ,'COLX/BTC','DRPU/LTC','CL/LTC','TRX/LTC','SCT/LTC','CAN/LTC','CENNZ/LTC','CRAVE/LTC'
        ,'VUC/LTC','ORE/LTC','POLIS/LTC','COLX/LTC','INPAY/BTC','ZNY/BTC','INPAY/LTC','ZNY/LTC'
        ,'MAG/BTC','MAG/LTC','ORE/DOGE','POLIS/DOGE','COLX/DOGE','INPAY/DOGE','ZNY/DOGE','MAG/DOGE'
        ,'$PAC/DOGE','ECA/BTC','ECA/LTC','ECA/DOGE','MARKS/BTC','MARKS/LTC','MARKS/DOGE','BLOCK/BTC'
        ,'BLOCK/LTC','BLOCK/DOGE','XP/BTC','XP/LTC','XP/DOGE','VIT/BTC','VIT/LTC','VIT/DOGE'
        ,'DEV/BTC','DEV/LTC','DEV/DOGE','SKRL/BTC','SKRL/LTC','SKRL/DOGE','BITG/BTC','BITG/LTC'
        ,'BITG/DOGE','LINA/BTC','LINA/LTC','LINA/DOGE','XSN/BTC','XSN/LTC','XSN/DOGE','IDH/BTC'
        ,'IDH/LTC','IDH/DOGE','EOS/BTC','EOS/LTC','EOS/DOGE','LIVE/BTC','LIVE/LTC','LIVE/DOGE'
        ,'LSK/BTC','LSK/LTC','LSK/DOGE','AMN/BTC','AMN/LTC','AMN/DOGE','LWF/BTC','LWF/LTC'
        ,'LWF/DOGE','OXY/BTC','OXY/LTC','OXY/DOGE','GCC/BTC','GCC/LTC','GCC/DOGE','ECA/USDT'
        ,'ETZ/BTC','ETZ/DOGE','ETZ/LTC','SRN/BTC','SRN/LTC','SRN/DOGE','TUSD/BTC','TUSD/LTC'
        ,'TUSD/DOGE','TUSD/USDT','ADA/BTC','ADA/LTC','ADA/DOGE','EZT/BTC','EZT/LTC','EZT/DOGE'
        ,'EZT/USDT','FT/BTC','FT/LTC','FT/DOGE','LYL/BTC','LYL/LTC','LYL/DOGE','LOKI/BTC'
        ,'LOKI/LTC','LOKI/DOGE','SYNX/BTC','SYNX/LTC','SYNX/DOGE','QTUM/BTC','QTUM/LTC','QTUM/DOGE'
        ,'SIRX/BTC','SIRX/DOGE','SIRX/LTC','ZEST/BTC','ZEST/LTC','ZEST/DOGE','PF/BTC','PF/LTC'
        ,'PF/DOGE','GIN/BTC','GIN/LTC','GIN/DOGE','BITS/BTC','BITS/LTC','BITS/DOGE','XBP/BTC'
        ,'XBP/LTC','XBP/DOGE','QAC/BTC','QAC/LTC','QAC/DOGE','TPAY/BTC','TPAY/LTC','TPAY/DOGE'
        ,'TWIST/BTC','TWIST/LTC','TWIST/DOGE','NPW/BTC','NPW/LTC','NPW/DOGE','PCN/BTC','PCN/LTC'
        ,'PCN/DOGE','NRG/BTC','NRG/LTC','NRG/DOGE','SHVR/BTC','SHVR/LTC','SHVR/DOGE','GZE/BTC'
        ,'GZE/LTC','GZE/DOGE','BUBO/BTC','BUBO/LTC','BUBO/DOGE','XZX/BTC','XZX/LTC','XZX/DOGE'
        ,'WHL/BTC','WHL/LTC','WHL/DOGE'
    ];
    arPair = [];
    isInvert = false;

    constructor(opt = {}) {
        this.config = {};
        this.name = 'Cryptopia';
        this.config.apiKey = (opt.apiKey) ? opt.apiKey : '';
        this.config.apiSecret = (opt.apiSecret) ? opt.apiSecret : '';
        this.config.url = (opt.url) ? opt.url : 'https://www.cryptopia.co.nz/api';
        this.config.proxy = (opt.proxy) ? opt.proxy : '';
    }

    modifyPair(arPair) {
        let newPair = [];
        newPair[0] = (arPair[0].toUpperCase() === 'USD') ? 'USDT' : arPair[0].toUpperCase();
        newPair[1] = (arPair[1].toUpperCase() === 'USD') ? 'USDT' : arPair[1].toUpperCase();
        return newPair;
    }

    setPair(arPair = ['btc', 'usd']) {
        arPair = this.modifyPair(arPair);
        const pairs = this.pairs;
        const varOne = `${arPair[0]}/${arPair[1]}`.toUpperCase();
        const varTwo = `${arPair[1]}/${arPair[0]}`.toUpperCase();
        if (pairs.indexOf(varOne) + 1) {
            this.pair = varOne;
            this.arPair = arPair.slice();
        } else if (pairs.indexOf(varTwo) + 1) {
            this.isInvert = true;
            this.pair = varTwo;
            this.arPair = utils.reverse(arPair.slice());
        } else {
            this.pair = '';
        }
    }

    isAvailable(arPair) {
        arPair = this.modifyPair(arPair);
        const pairs = this.pairs;
        const varOne = `${arPair[0]}/${arPair[1]}`.toUpperCase();
        const varTwo = `${arPair[1]}/${arPair[0]}`.toUpperCase();
        return !!((pairs.indexOf(varOne) + 1) || (pairs.indexOf(varTwo) + 1));
    }

    request(method = 'POST', path = '', data = {}) {


        return new Promise((resolve, reject) => {
            let url = this.config.url + '/' + path;
            let nonce = crypto.randomBytes(64).toString('hex');
            let md5 = crypto.createHash('md5').update(JSON.stringify(data)).digest();
            let requestContentBase64String = md5.toString('base64');
            let signature = this.config.apiKey + 'POST' + encodeURIComponent(this.config.url + '/' + path).toLowerCase() + nonce + requestContentBase64String;
            let hmacsignature = crypto.createHmac('sha256', new Buffer(this.config.apiSecret, 'base64')).update(signature).digest().toString('base64');
            const headers = 'amx ' + this.config.apiKey + ':' + hmacsignature + ':' + nonce;

            let options = {
                method: method,
                url: url,
                json: true,
                headers: {
                    'Authorization': headers
                },
                body: data
            };

            if (this.config.proxy) { options['proxy'] = this.config.proxy; }
            request(options, (err, response, body) => {
                if (response !== undefined && response.statusCode !== undefined && parseInt(response.statusCode) === 200 && (body && body['Success'] == true)) {
                    resolve({success: true, data: body['Data']});
                }
                else {
                    reject({
                        success: false,
                        errorMsg: (body && body['Error']) ? body['Error'] :  response !== undefined ? response.statusMessage : '',
                        errorCode: (body && body['Error']) ? -1 : response !== undefined ? response.statusCode : '',
                        errorOwner: this.name
                    });
                }
            });
        });
    }

    get(path = '', data = {}) {
        return this.request('GET', path, data);
    }

    post(path = '', data = {}) {
        return this.request('POST', path, data);
    }

    maxbid_minask() {
        const pair = this.arPair.join('_');

        return new Promise((resolve, reject) => {
            this.get(`GetMarket/${pair}`).then(
                res => {
                    try {
                        const data = {
                            maxBid: res.data.BidPrice,
                            minAsk: res.data.AskPrice,
                            stok: this
                        };
                        resolve(data);
                    } catch (e) { resolve(null); }
                },
                err => { reject(null); });
        });
    }

    getOrders(limit = 100) {
        const pair = this.pair.replace('\/', '_');
        return new Promise((resolve, reject) => {
            this.get(`GetMarketOrders/${pair}/${limit}`).then(
                res => {
                    try {
                        const response = res.data;
                        const lens = (x) => {return {rate: x['Price'], amount: x['Volume'], name: this.name}};
                        const bids = response['Sell'].map(lens);
                        const asks = response['Buy'].map(lens);
                        resolve({
                                name: this.name,
                                bids: bids, asks: asks,
                                pairFrom: this.arPair[0].toUpperCase(), pairTo: this.arPair[1].toUpperCase()
                        });
                    } catch (e) {
                        reject({success: false, errorCode: 500, errorMsg: e.message}); }
                },
                err => { reject(err); });
        });
    }

    tradeHistory(limit = 50, opt = {}) {
        return new Promise((resolve) => {
            if (opt.timeout) { setTimeout(() => resolve(null), opt.timeout);}
            const pair = this.arPair.join('_');
            this.get(`GetMarketHistory/${pair}`).then(res => {
                let response = res.data;
                if (response !== null) {
                    response = response.map(item => {
                        // console.log(item.Timestamp);
                        return {
                            price: item.Price,
                            amount: item.Amount,
                            type: (item.Type === 'Buy') ? 'buy' : 'sell',
                            date: new Date(parseInt(item.Timestamp) * 1000),
                            exchange: this.name
                        };
                    });

                    let sell = response.filter(item => item.type === 'sell').splice(0, limit);
                    let buy = response.filter(item => item.type === 'buy').splice(0, limit);
                    resolve({sell: sell, buy: buy});
                } else {
                    resolve(null);
                }

            }, () => { resolve(null); });
        });
    }


    balance() {
        return new Promise((resolve, reject) => {
            this.post('GetBalance').then(res => {
                const array = res['data'].map(item => {
                    return {currency: item['Symbol'].toLowerCase(), value: item['Available']};
                });

                resolve(array);
            }, err => reject(err));
        });
    }


    orderCreate(order) {
        if (order.arPair)
            this.setPair(order.arPair);
        const pair = this.pair;
        if (!pair) throw Error('Pair not set!');
        const type = (order.type.toUpperCase() === 'SELL' || order.type.toUpperCase() === 'BID') ? 'Sell' : 'Buy';
        let data = {
            Market: pair,
            Type: type,
            Amount: order.amount,
            Rate: order.rate
        };

        return new Promise((resolve, reject) => {

    //         setTimeout(() => {
    //             console.log(`HitBTC order:
    // type: ${data.Type} : ${typeof data.Type}
    // pair: ${data.Market} : ${typeof data.Market}
    // amount: ${data.Amount} : ${typeof data.Amount}
    // rate: ${data.Rate} : ${typeof data.Rate}`);
    //             resolve(Object.assign(order, {order_id: ~~(Math.random() * 1000000)}));
    //         }, Math.random() * 2000);
            //TODO UNCOMMENT
    //         //TODO ERROR RESOLVING
            this.post('SubmitTrade', data).then(
                res => {
                    resolve(Object.assign(order, {order_id: res['data']['OrderId']}));
                },
                err => reject(err));
        });
    }


    orderCancel(order_id) {
        let data = {
            Type: 'Trade',
            OrderId: order_id
        };

        return this.post('CancelTrade', data);
    }

    isCancel(order_id) {
        return new Promise(resolve => {
            this.userOpenOrders(order_id).then(res => {
                if (res['data'].find(item => item['OrderId'] === order_id)) { resolve(false);}
                else { resolve(true); }
            }, err => resolve(false));
        });
    }

    userOpenOrders() {
        const pair = this.pair;
        let data = {
            Market: pair
        };

        return new Promise((resolve, reject) => {
            this.post('GetOpenOrders', data).then(res => {

                res['data'] = res['data'].map(item => {
                    item['order_id'] = item['OrderId'];
                    item['created_at'] = new Date(item['TimeStamp']).getTime();
                    item['created_human'] = new Date(item['TimeStamp']);
                    return item;
                });

                resolve(res);

            }, err => reject(err));
        });
    }
}