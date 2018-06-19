/*
 * Author: Roman Kovjogin
 * Github: https://github.com/white-wolf-17
 * Copyright (c) 2018.
 */

// https://www.cryptopia.co.nz/Forum/Category/45

import request from 'request';

const crypto = require('crypto');
import map from 'lodash/map';
import {utils} from './utils';

export class CryptopiaService {

    pairs = ['BTC/USDT', 'BTC/NZDT', 'DOT/BTC', 'DOT/LTC', 'DOT/DOGE', 'DOT/USDT', 'DOT/NZDT', 'LTC/BTC', 'LTC/USDT', 'LTC/NZDT', 'DOGE/BTC', 'DOGE/LTC', 'DOGE/USDT', 'DOGE/NZDT', 'POT/BTC', 'POT/LTC', 'POT/DOGE', 'FTC/BTC', 'FTC/LTC', 'FTC/DOGE', 'WSX/BTC', 'WSX/LTC', 'WSX/DOGE', 'POP/BTC', 'POP/LTC', 'POP/DOGE', 'RDD/BTC', 'RDD/LTC', 'RDD/DOGE', 'DARK/BTC', 'DARK/LTC', 'DARK/DOGE', 'DGB/BTC', 'DGB/LTC', 'DGB/DOGE', 'ARI/BTC', 'ARI/LTC', 'ARI/DOGE', 'BCF/BTC', 'BCF/LTC', 'BCF/DOGE', 'BGR/LTC', 'BGR/DOGE', 'SONG/BTC', 'SONG/LTC', 'SONG/DOGE', 'LOT/LTC', 'LOT/DOGE', 'SXC/BTC', 'SXC/LTC', 'SXC/DOGE', 'XMG/BTC', 'XMG/LTC', 'XMG/DOGE', 'RED/LTC', 'RED/DOGE', 'RED/BTC', 'CCB/LTC', 'CCB/DOGE', 'PENG/LTC', 'PENG/DOGE', 'CON/BTC', 'CON/LTC', 'CON/DOGE', '$$$/BTC', '$$$/LTC', '$$$/DOGE', 'QTL/BTC', 'QTL/LTC', 'QTL/DOGE', 'XGR/BTC', 'XGR/LTC', 'XGR/DOGE', 'BSD/BTC', 'BSD/LTC', 'BSD/DOGE', 'BSD/USDT', 'OK/BTC', 'OK/LTC', 'OK/DOGE', 'GEO/BTC', 'GEO/LTC', 'GEO/DOGE', 'BSTY/BTC', 'BSTY/LTC', 'BSTY/DOGE', 'TIT/BTC', 'TIT/LTC', 'TIT/DOGE', 'TTY/LTC', 'TTY/DOGE', 'XVG/BTC', 'XVG/LTC', 'XVG/DOGE', 'XVG/USDT', 'XVG/NZDT', 'TOP/LTC', 'TOP/DOGE', 'TOP/BTC', 'GXG/LTC', 'GXG/DOGE', 'ORB/BTC', 'ORB/LTC', 'ORB/DOGE', 'FTCC/LTC', 'FTCC/DOGE', 'MTLMC/BTC', 'MTLMC/LTC', 'MTLMC/DOGE', 'CBX/BTC', 'CBX/LTC', 'CBX/DOGE', 'GUN/BTC', 'GUN/LTC', 'GUN/DOGE', 'GCN/LTC', 'GCN/DOGE', 'MOTO/BTC', 'MOTO/LTC', 'MOTO/DOGE', 'FONZ/BTC', 'FONZ/LTC', 'FONZ/DOGE', 'TTC/BTC', 'TTC/LTC', 'TTC/DOGE', 'SPN/LTC', 'SPN/DOGE', 'SQL/BTC', 'SQL/LTC', 'SQL/DOGE', 'HBN/BTC', 'HBN/LTC', 'HBN/DOGE', 'PXC/BTC', 'PXC/LTC', 'PXC/DOGE', 'ZEIT/LTC', 'ZEIT/DOGE', 'UNIC/BTC', 'UNIC/LTC', 'UNIC/DOGE', 'UNO/BTC', 'UNO/LTC', 'UNO/DOGE', 'UNO/USDT', 'PIGGY/BTC', 'PIGGY/LTC', 'PIGGY/DOGE', 'OZC/LTC', 'OZC/DOGE', 'FUNK/LTC', 'FUNK/DOGE', 'LEA/LTC', 'LEA/DOGE', 'PAC/BTC', 'PAC/LTC', 'PAC/DOGE', 'BLZ/LTC', 'BLZ/DOGE', 'EMC/BTC', 'EMC/LTC', 'EMC/DOGE', 'OFF/BTC', 'OFF/LTC', 'OFF/DOGE', 'BUN/LTC', 'BUN/DOGE', 'SOON/BTC', 'SOON/LTC', 'SOON/DOGE', '8BIT/BTC', '8BIT/LTC', '8BIT/DOGE', 'FLN/LTC', 'FLN/DOGE', 'LDOGE/LTC', 'LDOGE/DOGE', 'PND/BTC', 'PND/LTC', 'PND/DOGE', 'HYP/BTC', 'HYP/LTC', 'HYP/DOGE', 'DEM/BTC', 'DEM/LTC', 'DEM/DOGE', 'SHA/BTC', 'SHA/LTC', 'SHA/DOGE', 'IRL/BTC', 'IRL/LTC', 'IRL/DOGE', 'SKC/BTC', 'SKC/LTC', 'SKC/DOGE', 'AC/BTC', 'AC/LTC', 'AC/DOGE', 'MARS/BTC', 'MARS/LTC', 'MARS/DOGE', 'MEC/BTC', 'MEC/LTC', 'MEC/DOGE', 'SAK/LTC', 'SAK/DOGE', 'SAK/BTC', 'TES/BTC', 'TES/LTC', 'TES/DOGE', 'RC/BTC', 'RC/LTC', 'RC/DOGE', 'GDC/LTC', 'GDC/DOGE', 'I0C/BTC', 'I0C/LTC', 'I0C/DOGE', 'FLAX/BTC', 'FLAX/LTC', 'FLAX/DOGE', 'XPD/BTC', 'XPD/LTC', 'XPD/DOGE', 'ANI/BTC', 'ANI/LTC', 'ANI/DOGE', 'DUO/BTC', 'DUO/LTC', 'DUO/DOGE', 'GRW/BTC', 'GRW/LTC', 'GRW/DOGE', 'PLC/BTC', 'PLC/LTC', 'PLC/DOGE', 'SJW/LTC', 'SJW/DOGE', 'NKA/LTC', 'NKA/DOGE', 'V/BTC', 'V/LTC', 'V/DOGE', 'ADC/BTC', 'ADC/LTC', 'ADC/DOGE', 'BNX/BTC', 'BNX/LTC', 'BNX/DOGE', 'CHC/BTC', 'CHC/LTC', 'CHC/DOGE', 'TRK/BTC', 'TRK/LTC', 'TRK/DOGE', 'CPN/BTC', 'CPN/LTC', 'CPN/DOGE', 'GAME/BTC', 'GAME/LTC', 'GAME/DOGE', 'CFC/BTC', 'CFC/LTC', 'CFC/DOGE', 'ELC/BTC', 'ELC/LTC', 'ELC/DOGE', 'SPT/BTC', 'SPT/LTC', 'SPT/DOGE', 'SLOTH/LTC', 'SLOTH/DOGE', 'WDC/BTC', 'WDC/LTC', 'WDC/DOGE', 'TEK/LTC', 'TEK/DOGE', 'PR/BTC', 'PR/LTC', 'PR/DOGE', 'START/BTC', 'START/LTC', 'START/DOGE', 'TRI/BTC', 'TRI/LTC', 'TRI/DOGE', 'RBY/BTC', 'RBY/LTC', 'RBY/DOGE', 'GP/BTC', 'GP/LTC', 'GP/DOGE', 'PPC/BTC', 'PPC/LTC', 'PPC/DOGE', 'EUC/BTC', 'EUC/LTC', 'EUC/DOGE', 'NVC/BTC', 'NVC/LTC', 'NVC/DOGE', 'BLK/BTC', 'BLK/LTC', 'BLK/DOGE', 'PAK/BTC', 'PAK/LTC', 'PAK/DOGE', 'DIME/LTC', 'DIME/DOGE', 'VRC/BTC', 'VRC/LTC', 'VRC/DOGE', 'PTC/BTC', 'PTC/LTC', 'PTC/DOGE', 'PCC/BTC', 'PCC/LTC', 'PCC/DOGE', 'CLAM/BTC', 'CLAM/LTC', 'CLAM/DOGE', 'INFX/BTC', 'INFX/LTC', 'INFX/DOGE', 'CANN/BTC', 'CANN/LTC', 'CANN/DOGE', 'XPM/BTC', 'XPM/LTC', 'XPM/DOGE', 'CDN/BTC', 'CDN/LTC', 'CDN/DOGE', 'LFTC/LTC', 'LFTC/DOGE', 'NET/BTC', 'NET/LTC', 'NET/DOGE', 'GAIA/BTC', 'GAIA/LTC', 'GAIA/DOGE', 'MZC/BTC', 'MZC/LTC', 'MZC/DOGE', 'BOLI/LTC', 'BOLI/DOGE', 'BOLI/BTC', 'BTCS/BTC', 'BTCS/LTC', 'BTCS/DOGE', 'NYAN/BTC', 'NYAN/LTC', 'NYAN/DOGE', 'EBG/BTC', 'EBG/LTC', 'EBG/DOGE', 'GLD/BTC', 'GLD/LTC', 'GLD/DOGE', 'SLG/LTC', 'SLG/DOGE', 'SLG/BTC', 'BUMBA/BTC', 'BUMBA/LTC', 'BUMBA/DOGE', 'BIRD/LTC', 'BIRD/DOGE', 'BTA/BTC', 'BTA/LTC', 'BTA/DOGE', 'AUR/BTC', 'AUR/LTC', 'AUR/DOGE', 'NOTE/BTC', 'NOTE/LTC', 'NOTE/DOGE', 'BTCD/BTC', 'BTCD/LTC', 'BTCD/DOGE', 'EPC/LTC', 'EPC/DOGE', 'RBT/BTC', 'RBT/LTC', 'RBT/DOGE', 'STV/BTC', 'STV/LTC', 'STV/DOGE', 'XMY/BTC', 'XMY/LTC', 'XMY/DOGE', 'EVO/BTC', 'EVO/LTC', 'EVO/DOGE', 'EGC/BTC', 'EGC/LTC', 'EGC/DOGE', 'BTB/BTC', 'BTB/LTC', 'BTB/DOGE', 'PHS/BTC', 'PHS/LTC', 'PHS/DOGE', 'OSC/BTC', 'OSC/LTC', 'OSC/DOGE', 'EMD/BTC', 'EMD/LTC', 'EMD/DOGE', 'CORG/LTC', 'CORG/DOGE', 'SWING/BTC', 'SWING/LTC', 'SWING/DOGE', 'MINT/BTC', 'MINT/LTC', 'MINT/DOGE', 'DGC/BTC', 'DGC/LTC', 'DGC/DOGE', 'BUCKS/BTC', 'BUCKS/LTC', 'BUCKS/DOGE', 'QRK/BTC', 'QRK/LTC', 'QRK/DOGE', 'MEOW/LTC', 'MEOW/DOGE', 'EVIL/BTC', 'EVIL/LTC', 'EVIL/DOGE', 'CAT/BTC', 'CAT/LTC', 'CAT/DOGE', 'FST/BTC', 'FST/LTC', 'FST/DOGE', 'NMC/BTC', 'NMC/LTC', 'NMC/DOGE', 'UMO/BTC', 'UMO/LTC', 'UMO/DOGE', 'UIS/BTC', 'UIS/LTC', 'UIS/DOGE', 'BITB/BTC', 'BITB/LTC', 'BITB/DOGE', 'TX/BTC', 'TX/LTC', 'TX/DOGE', 'TRC/BTC', 'TRC/LTC', 'TRC/DOGE', 'XCT/BTC', 'XCT/LTC', 'XCT/DOGE', 'XMR/BTC', 'XMR/LTC', 'XMR/DOGE', 'XMR/USDT', 'XMR/NZDT', 'ELP/LTC', 'ELP/DOGE', 'HAL/BTC', 'HAL/LTC', 'HAL/DOGE', 'NAV/BTC', 'NAV/LTC', 'NAV/DOGE', 'NAV/USDT', 'NAV/NZDT', 'DCR/BTC', 'DCR/LTC', 'DCR/DOGE', 'DCR/USDT', 'RPC/BTC', 'RPC/LTC', 'RPC/DOGE', 'KUMA/LTC', 'KUMA/DOGE', 'LTB/LTC', 'LTB/DOGE', 'LTB/BTC', 'IMS/LTC', 'IMS/DOGE', 'IMS/BTC', 'LEAF/LTC', 'LEAF/DOGE', 'BEEZ/BTC', 'BEEZ/LTC', 'BEEZ/DOGE', 'NTRN/BTC', 'NTRN/LTC', 'NTRN/DOGE', 'MOIN/LTC', 'MOIN/DOGE', 'MOIN/BTC', 'FUZZ/BTC', 'FUZZ/LTC', 'FUZZ/DOGE', 'KED/BTC', 'KED/LTC', 'KED/DOGE', 'IXC/BTC', 'IXC/LTC', 'IXC/DOGE', 'XBC/BTC', 'XBC/LTC', 'XBC/DOGE', 'YOVI/BTC', 'YOVI/LTC', 'YOVI/DOGE', 'ACOIN/BTC', 'ACOIN/LTC', 'ACOIN/DOGE', 'FRN/BTC', 'FRN/LTC', 'FRN/DOGE', 'RBBT/LTC', 'RBBT/DOGE', 'BAT/LTC', 'BAT/DOGE', 'EDRC/BTC', 'EDRC/LTC', 'EDRC/DOGE', 'FFC/LTC', 'FFC/DOGE', 'BRG/LTC', 'BRG/DOGE', 'LEMON/BTC', 'LEMON/LTC', 'LEMON/DOGE', 'PHO/LTC', 'PHO/DOGE', 'LIT/BTC', 'LIT/LTC', 'LIT/DOGE', 'BLC/BTC', 'BLC/LTC', 'BLC/DOGE', 'SKR/BTC', 'SKR/LTC', 'SKR/DOGE', 'GPL/BTC', 'GPL/LTC', 'GPL/DOGE', 'ARG/BTC', 'ARG/LTC', 'ARG/DOGE', 'TGC/BTC', 'TGC/LTC', 'TGC/DOGE', 'FCN/BTC', 'FCN/LTC', 'FCN/DOGE', 'BERN/BTC', 'BERN/LTC', 'BERN/DOGE', 'TRUMP/BTC', 'TRUMP/LTC', 'TRUMP/DOGE', 'LYC/LTC', 'LYC/DOGE', 'BXC/BTC', 'BXC/LTC', 'BXC/DOGE', 'XRA/BTC', 'XRA/LTC', 'XRA/DOGE', 'CLOAK/BTC', 'CLOAK/LTC', 'CLOAK/DOGE', 'XRE/BTC', 'XRE/LTC', 'XRE/DOGE', 'MNM/BTC', 'MNM/LTC', 'MNM/DOGE', 'SMC/BTC', 'SMC/LTC', 'SMC/DOGE', 'CC/BTC', 'CC/LTC', 'CC/DOGE', 'KRB/BTC', 'KRB/LTC', 'KRB/DOGE', 'XJO/BTC', 'XJO/LTC', 'XJO/DOGE', 'ZET/BTC', 'ZET/LTC', 'ZET/DOGE', '1337/LTC', '1337/DOGE', 'GAY/BTC', 'GAY/LTC', 'GAY/DOGE', 'AU/BTC', 'AU/LTC', 'AU/DOGE', 'SYNX/BTC', 'SYNX/LTC', 'SYNX/DOGE', '888/BTC', '888/LTC', '888/DOGE', 'QBT/BTC', 'QBT/LTC', 'QBT/DOGE', '808/LTC', '808/DOGE', 'NXS/BTC', 'NXS/LTC', 'NXS/DOGE', 'CJ/BTC', 'CJ/LTC', 'CJ/DOGE', 'KDC/BTC', 'KDC/LTC', 'KDC/DOGE', 'EDC/BTC', 'EDC/LTC', 'EDC/DOGE', 'GRN/BTC', 'GRN/LTC', 'GRN/DOGE', 'ETC/BTC', 'ETC/LTC', 'ETC/DOGE', 'ETC/USDT', 'ETC/NZDT', 'EXP/BTC', 'EXP/LTC', 'EXP/DOGE', 'CRX/BTC', 'CRX/LTC', 'CRX/DOGE', 'CMT/BTC', 'CMT/LTC', 'CMT/DOGE', 'BTG/BTC', 'BTG/LTC', 'BTG/DOGE', 'MAC/BTC', 'MAC/LTC', 'MAC/DOGE', 'VPRC/LTC', 'VPRC/DOGE', 'POST/BTC', 'POST/LTC', 'POST/DOGE', 'AGA/LTC', 'AGA/DOGE', 'LDC/BTC', 'LDC/LTC', 'LDC/DOGE', 'OPAL/BTC', 'OPAL/LTC', 'OPAL/DOGE', 'BVB/BTC', 'BVB/LTC', 'BVB/DOGE', 'FJC/BTC', 'FJC/LTC', 'FJC/DOGE', 'EFL/BTC', 'EFL/LTC', 'EFL/DOGE', 'GAP/BTC', 'GAP/LTC', 'GAP/DOGE', 'LBC/BTC', 'LBC/LTC', 'LBC/DOGE', 'FCT/BTC', 'FCT/LTC', 'FCT/DOGE', 'BENJI/BTC', 'BENJI/LTC', 'BENJI/DOGE', 'KASH/BTC', 'KASH/LTC', 'KASH/DOGE', 'SPACE/BTC', 'SPACE/LTC', 'SPACE/DOGE', 'VRM/BTC', 'VRM/LTC', 'VRM/DOGE', 'GRS/BTC', 'GRS/LTC', 'GRS/DOGE', 'PIVX/BTC', 'PIVX/LTC', 'PIVX/DOGE', 'CCN/BTC', 'CCN/LTC', 'CCN/DOGE', 'FLT/BTC', 'FLT/LTC', 'FLT/DOGE', 'COAL/BTC', 'COAL/LTC', 'COAL/DOGE', 'XZC/BTC', 'XZC/LTC', 'XZC/DOGE', 'ATOM/BTC', 'ATOM/LTC', 'ATOM/DOGE', 'MST/BTC', 'MST/LTC', 'MST/DOGE', 'ZEC/BTC', 'ZEC/LTC', 'ZEC/DOGE', 'ZEC/USDT', 'ZEC/NZDT', 'EMB/LTC', 'EMB/DOGE', 'UR/BTC', 'UR/LTC', 'UR/DOGE', 'ARC/BTC', 'ARC/LTC', 'ARC/DOGE', 'Q2C/BTC', 'Q2C/LTC', 'Q2C/DOGE', 'BIP/BTC', 'BIP/LTC', 'BIP/DOGE', 'WW/BTC', 'WW/LTC', 'WW/DOGE', 'ZCL/BTC', 'ZCL/LTC', 'ZCL/DOGE', 'ZOI/BTC', 'ZOI/LTC', 'ZOI/DOGE', 'VCC/BTC', 'VCC/LTC', 'VCC/DOGE', 'STRAT/BTC', 'STRAT/LTC', 'STRAT/DOGE', 'HUSH/BTC', 'HUSH/LTC', 'HUSH/DOGE', 'HUSH/USDT', 'HUSH/NZDT', 'KURT/BTC', 'KURT/LTC', 'KURT/DOGE', 'CQST/BTC', 'CQST/LTC', 'CQST/DOGE', 'BOSON/LTC', 'BOSON/DOGE', 'SIB/BTC', 'SIB/LTC', 'SIB/DOGE', 'ARCO/BTC', 'ARCO/LTC', 'ARCO/DOGE', 'LOOK/LTC', 'LOOK/DOGE', 'XCRE/BTC', 'XCRE/LTC', 'XCRE/DOGE', 'POSW/BTC', 'POSW/LTC', 'POSW/DOGE', 'IN/BTC', 'IN/LTC', 'IN/DOGE', 'CHESS/BTC', 'CHESS/LTC', 'CHESS/DOGE', 'CAR/BTC', 'CAR/LTC', 'CAR/DOGE', 'KOBO/BTC', 'KOBO/LTC', 'KOBO/DOGE', 'CHIEF/LTC', 'CHIEF/DOGE', 'UNITS/BTC', 'UNITS/LTC', 'UNITS/DOGE', 'SEL/BTC', 'SEL/LTC', 'SEL/DOGE', 'GPU/BTC', 'GPU/LTC', 'GPU/DOGE', 'ICOB/BTC', 'ICOB/LTC', 'ICOB/DOGE', 'OOO/BTC', 'OOO/LTC', 'OOO/DOGE', '42/BTC', '42/LTC', '42/DOGE', 'VIDZ/BTC', 'VIDZ/LTC', 'VIDZ/DOGE', 'DON/BTC', 'DON/LTC', 'DON/DOGE', 'ERY/BTC', 'ERY/LTC', 'ERY/DOGE', 'NEVA/BTC', 'NEVA/LTC', 'NEVA/DOGE', 'LANA/BTC', 'LANA/LTC', 'LANA/DOGE', 'XSPEC/BTC', 'XSPEC/LTC', 'XSPEC/DOGE', 'XBTS/BTC', 'XBTS/LTC', 'XBTS/DOGE', 'TAJ/BTC', 'TAJ/LTC', 'TAJ/DOGE', 'MARX/BTC', 'MARX/LTC', 'MARX/DOGE', 'PXI/BTC', 'PXI/LTC', 'PXI/DOGE', 'WRC/BTC', 'WRC/LTC', 'WRC/DOGE', 'SFC/BTC', 'SFC/LTC', 'SFC/DOGE', 'LEPEN/LTC', 'LEPEN/DOGE', 'KMD/BTC', 'KMD/LTC', 'KMD/DOGE', 'STC/BTC', 'STC/LTC', 'STC/DOGE', 'KUSH/BTC', 'KUSH/LTC', 'KUSH/DOGE', 'FRC/BTC', 'FRC/LTC', 'FRC/DOGE', 'TSE/BTC', 'TSE/LTC', 'TSE/DOGE', 'MAR/BTC', 'MAR/LTC', 'MAR/DOGE', 'UTC/BTC', 'UTC/LTC', 'UTC/DOGE', 'MCRN/BTC', 'MCRN/LTC', 'MCRN/DOGE', 'ALEX/BTC', 'ALEX/LTC', 'ALEX/DOGE', 'ZER/BTC', 'ZER/LTC', 'ZER/DOGE', 'MLITE/BTC', 'MLITE/LTC', 'MLITE/DOGE', 'ARGUS/BTC', 'ARGUS/LTC', 'ARGUS/DOGE', 'NETKO/BTC', 'NETKO/LTC', 'NETKO/DOGE', 'RNS/BTC', 'RNS/LTC', 'RNS/DOGE', 'ALL/BTC', 'ALL/LTC', 'ALL/DOGE', 'MOJO/BTC', 'MOJO/LTC', 'MOJO/DOGE', 'GEERT/BTC', 'GEERT/LTC', 'GEERT/DOGE', 'PASL/BTC', 'PASL/LTC', 'PASL/DOGE', 'UBQ/BTC', 'UBQ/LTC', 'UBQ/DOGE', 'MUSIC/BTC', 'MUSIC/LTC', 'MUSIC/DOGE', 'SAFEX/BTC', 'SAFEX/LTC', 'SAFEX/DOGE', 'HXX/BTC', 'HXX/LTC', 'HXX/DOGE', 'AMP/BTC', 'AMP/LTC', 'AMP/DOGE', 'MAID/BTC', 'MAID/LTC', 'MAID/DOGE', 'ITI/BTC', 'ITI/LTC', 'ITI/DOGE', 'ARK/BTC', 'ARK/LTC', 'ARK/DOGE', 'ARK/USDT', 'ZSE/BTC', 'ZSE/LTC', 'ZSE/DOGE', 'ALT/BTC', 'ALT/LTC', 'ALT/DOGE', 'WLC/BTC', 'WLC/LTC', 'WLC/DOGE', 'DASH/BTC', 'DASH/LTC', 'DASH/DOGE', 'DASH/USDT', 'BEST/BTC', 'BEST/LTC', 'BEST/DOGE', 'EC/BTC', 'EC/LTC', 'EC/DOGE', 'GBYTE/BTC', 'GBYTE/LTC', 'GBYTE/DOGE', 'PUT/BTC', 'PUT/LTC', 'PUT/DOGE', 'ECO/BTC', 'ECO/LTC', 'ECO/DOGE', 'SKY/BTC', 'SKY/LTC', 'SKY/DOGE', 'SKY/USDT', 'SKY/NZDT', 'NOBL/BTC', 'NOBL/LTC', 'NOBL/DOGE', 'BITS/BTC', 'BITS/LTC', 'BITS/DOGE', 'ATMS/BTC', 'ATMS/LTC', 'ATMS/DOGE', 'PEPE/BTC', 'PEPE/LTC', 'PEPE/DOGE', 'PINK/BTC', 'PINK/LTC', 'PINK/DOGE', 'PROC/BTC', 'PROC/LTC', 'PROC/DOGE', 'BTX/BTC', 'BTX/LTC', 'BTX/DOGE', 'BTX/NZDT', 'BTX/USDT', 'FAZZ/BTC', 'FAZZ/LTC', 'FAZZ/DOGE', 'NZDT/USDT', 'CRAVE/BTC', 'CRAVE/LTC', 'CRAVE/DOGE', 'RAIN/BTC', 'RAIN/LTC', 'RAIN/DOGE', 'SUMO/BTC', 'SUMO/LTC', 'SUMO/DOGE', 'C2/BTC', 'C2/LTC', 'C2/DOGE', 'CREA/BTC', 'CREA/LTC', 'CREA/DOGE', 'CXT/BTC', 'CXT/LTC', 'CXT/DOGE', 'INSN/BTC', 'INSN/LTC', 'INSN/DOGE', 'XBY/BTC', 'XBY/LTC', 'XBY/DOGE', 'FUEL/BTC', 'FUEL/LTC', 'FUEL/DOGE', 'TER/BTC', 'TER/LTC', 'TER/DOGE', 'XEM/BTC', 'XEM/LTC', 'XEM/DOGE', 'CFT/BTC', 'CFT/LTC', 'CFT/DOGE', 'ETH/BTC', 'ETH/LTC', 'ETH/DOGE', 'ETH/USDT', 'ETH/NZDT', 'GNO/BTC', 'GNO/LTC', 'GNO/DOGE', 'GNT/BTC', 'GNT/LTC', 'GNT/DOGE', 'CACH/BTC', 'CACH/LTC', 'CACH/DOGE', 'SAND/BTC', 'SAND/LTC', 'SAND/DOGE', 'REP/BTC', 'REP/LTC', 'REP/DOGE', 'LIZI/BTC', 'LIZI/LTC', 'LIZI/DOGE', 'CRYPT/BTC', 'CRYPT/LTC', 'CRYPT/DOGE', 'DCY/BTC', 'DCY/LTC', 'DCY/DOGE', 'DAXX/BTC', 'DAXX/LTC', 'DAXX/DOGE', 'EMC2/BTC', 'EMC2/LTC', 'EMC2/DOGE', 'FLASH/BTC', 'FLASH/LTC', 'FLASH/DOGE', 'ECOB/BTC', 'ECOB/LTC', 'ECOB/DOGE', 'MNE/BTC', 'MNE/LTC', 'MNE/DOGE', 'TOA/BTC', 'TOA/LTC', 'TOA/DOGE', 'SOIL/BTC', 'SOIL/LTC', 'SOIL/DOGE', 'LINDA/BTC', 'LINDA/LTC', 'LINDA/DOGE', 'CHAN/BTC', 'CHAN/LTC', 'CHAN/DOGE', 'UNIFY/BTC', 'UNIFY/LTC', 'UNIFY/DOGE', 'XRY/LTC', 'XRY/DOGE', 'MAGN/BTC', 'MAGN/LTC', 'MAGN/DOGE', 'DNR/BTC', 'DNR/LTC', 'DNR/DOGE', 'XCO/BTC', 'XCO/LTC', 'XCO/DOGE', '300/BTC', '300/LTC', '300/DOGE', 'XPTX/BTC', 'XPTX/LTC', 'XPTX/DOGE', '611/BTC', '611/LTC', '611/DOGE', 'KEK/BTC', 'KEK/LTC', 'KEK/DOGE', 'BAY/BTC', 'BAY/LTC', 'BAY/DOGE', 'MINEX/BTC', 'MINEX/LTC', 'MINEX/DOGE', 'MSP/BTC', 'MSP/LTC', 'MSP/DOGE', '21M/BTC', '21M/LTC', '21M/DOGE', 'XID/BTC', 'XID/LTC', 'XID/DOGE', 'MGO/BTC', 'MGO/LTC', 'MGO/DOGE', 'BNC/BTC', 'BNC/LTC', 'BNC/DOGE', 'DOPE/BTC', 'DOPE/LTC', 'DOPE/DOGE', 'NLC2/BTC', 'NLC2/LTC', 'NLC2/DOGE', 'SRC/BTC', 'SRC/LTC', 'SRC/DOGE', 'SHRM/BTC', 'SHRM/LTC', 'SHRM/DOGE', 'ACC/BTC', 'ACC/LTC', 'ACC/DOGE', 'SMART/BTC', 'SMART/LTC', 'SMART/DOGE', 'GRWI/BTC', 'GRWI/LTC', 'GRWI/DOGE', 'LINX/BTC', 'LINX/LTC', 'LINX/DOGE', 'IFLT/LTC', 'IFLT/DOGE', 'BCH/BTC', 'BCH/LTC', 'BCH/DOGE', 'BCH/USDT', 'BCH/NZDT', 'WEED/BTC', 'WEED/LTC', 'WEED/DOGE', 'DRXNE/BTC', 'DRXNE/LTC', 'DRXNE/DOGE', 'DCN/LTC', 'DCN/DOGE', 'VUC/BTC', 'VUC/LTC', 'VUC/DOGE', 'PLR/BTC', 'PLR/LTC', 'PLR/DOGE', 'FORT/BTC', 'FORT/LTC', 'FORT/DOGE', 'ADST/BTC', 'ADST/LTC', 'ADST/DOGE', 'DDF/BTC', 'DDF/LTC', 'DDF/DOGE', 'BRO/BTC', 'BRO/LTC', 'BRO/DOGE', 'ABY/BTC', 'ABY/LTC', 'ABY/DOGE', 'XCXT/BTC', 'XCXT/LTC', 'XCXT/DOGE', 'RIYA/BTC', 'RIYA/LTC', 'RIYA/DOGE', 'DAS/BTC', 'DAS/LTC', 'DAS/DOGE', 'DRP/BTC', 'DRP/LTC', 'DRP/DOGE', 'ABC/BTC', 'ABC/LTC', 'ABC/DOGE', 'OX/LTC', 'OX/DOGE', 'DALC/BTC', 'DALC/LTC', 'DALC/DOGE', 'NAMO/LTC', 'NAMO/DOGE', 'IFT/BTC', 'IFT/LTC', 'IFT/DOGE', 'XST/BTC', 'XST/LTC', 'XST/DOGE', 'KRONE/BTC', 'KRONE/LTC', 'KRONE/DOGE', 'LBTC/BTC', 'LBTC/LTC', 'LBTC/DOGE', 'LTCU/BTC', 'LTCU/LTC', 'LTCU/DOGE', 'ETT/BTC', 'ETT/LTC', 'ETT/DOGE', 'KGB/BTC', 'KGB/LTC', 'KGB/DOGE', 'SKIN/BTC', 'SKIN/LTC', 'SKIN/DOGE', 'CNNC/BTC', 'CNNC/LTC', 'CNNC/DOGE', 'CMPCO/BTC', 'CMPCO/LTC', 'CMPCO/DOGE', 'MYB/BTC', 'MYB/LTC', 'MYB/DOGE', 'OMG/BTC', 'OMG/LTC', 'OMG/DOGE', 'PAY/BTC', 'PAY/LTC', 'PAY/DOGE', 'DBIX/BTC', 'DBIX/LTC', 'DBIX/DOGE', 'NEO/BTC', 'NEO/LTC', 'NEO/DOGE', 'MTNC/BTC', 'MTNC/LTC', 'MTNC/DOGE', 'MBRS/BTC', 'MBRS/LTC', 'MBRS/DOGE', 'RKC/BTC', 'RKC/LTC', 'RKC/DOGE', 'ATH/BTC', 'ATH/LTC', 'ATH/DOGE', 'CRM/BTC', 'CRM/LTC', 'CRM/DOGE', 'BDL/BTC', 'BDL/LTC', 'BDL/DOGE', 'ZEN/BTC', 'ZEN/LTC', 'ZEN/DOGE', 'SPR/BTC', 'SPR/LTC', 'SPR/DOGE', 'XFT/BTC', 'XFT/LTC', 'XFT/DOGE', 'STRC/BTC', 'STRC/LTC', 'STRC/DOGE', 'NDAO/BTC', 'NDAO/LTC', 'NDAO/DOGE', 'XLC/BTC', 'XLC/LTC', 'XLC/DOGE', 'WILD/BTC', 'WILD/LTC', 'WILD/DOGE', 'MTL/BTC', 'MTL/LTC', 'MTL/DOGE', 'ORME/BTC', 'ORME/LTC', 'ORME/DOGE', 'ORME/NZDT', 'ORME/USDT', 'BKCAT/BTC', 'BKCAT/LTC', 'BKCAT/DOGE', 'NEBL/BTC', 'NEBL/LTC', 'NEBL/DOGE', 'CTR/BTC', 'CTR/LTC', 'CTR/DOGE', 'BTM/BTC', 'BTM/LTC', 'BTM/DOGE', 'XMCC/BTC', 'XMCC/LTC', 'XMCC/DOGE', 'EQT/BTC', 'EQT/LTC', 'EQT/DOGE', 'DP/BTC', 'DP/LTC', 'DP/DOGE', 'BOP/BTC', 'BOP/LTC', 'BOP/DOGE', 'IQT/BTC', 'IQT/LTC', 'IQT/DOGE', 'XBL/BTC', 'XBL/LTC', 'XBL/DOGE', 'MCI/BTC', 'MCI/LTC', 'MCI/DOGE', 'COR/BTC', 'COR/LTC', 'COR/DOGE', 'HAC/BTC', 'HAC/LTC', 'HAC/DOGE', 'HDLB/BTC', 'HDLB/LTC', 'HDLB/DOGE', 'KNC/BTC', 'KNC/LTC', 'KNC/DOGE', 'QWARK/BTC', 'QWARK/LTC', 'QWARK/DOGE', 'APX/BTC', 'APX/LTC', 'APX/DOGE', 'KING/BTC', 'KING/LTC', 'KING/DOGE', 'KAYI/BTC', 'KAYI/LTC', 'KAYI/DOGE', 'ODN/BTC', 'ODN/LTC', 'ODN/DOGE', 'RUP/BTC', 'RUP/LTC', 'RUP/DOGE', 'HSR/BTC', 'HSR/LTC', 'HSR/DOGE', 'XGOX/BTC', 'XGOX/LTC', 'XGOX/DOGE', 'R/BTC', 'R/LTC', 'R/DOGE', 'RICKS/BTC', 'RICKS/LTC', 'RICKS/DOGE', 'CEFS/BTC', 'CEFS/LTC', 'CEFS/DOGE', 'CEFS/NZDT', 'CEFS/USDT', 'BIS/BTC', 'BIS/LTC', 'BIS/DOGE', 'HLM/BTC', 'HLM/LTC', 'HLM/DOGE', 'BTDX/BTC', 'BTDX/LTC', 'BTDX/DOGE', 'ELM/BTC', 'ELM/LTC', 'ELM/DOGE', 'EVR/BTC', 'EVR/LTC', 'EVR/DOGE', 'SDRN/BTC', 'SDRN/LTC', 'SDRN/DOGE', 'TIX/BTC', 'TIX/LTC', 'TIX/DOGE', 'ALIS/BTC', 'ALIS/LTC', 'ALIS/DOGE', 'CTIC3/BTC', 'CTIC3/LTC', 'CTIC3/DOGE', 'SCL/BTC', 'SCL/LTC', 'SCL/DOGE', 'ENJ/BTC', 'ENJ/LTC', 'ENJ/DOGE', 'DFS/BTC', 'DFS/LTC', 'DFS/DOGE', 'COPPER/BTC', 'COPPER/LTC', 'COPPER/DOGE', 'OTN/BTC', 'OTN/LTC', 'OTN/DOGE', 'PURA/BTC', 'PURA/LTC', 'PURA/DOGE', 'COMP/LTC', 'COMP/DOGE', 'DPP/BTC', 'DPP/LTC', 'DPP/DOGE', 'SBC/BTC', 'SBC/LTC', 'SBC/DOGE', 'LUX/BTC', 'LUX/LTC', 'LUX/DOGE', 'LUX/NZDT', 'LUX/USDT', 'PIRL/BTC', 'PIRL/LTC', 'PIRL/DOGE', 'CNO/BTC', 'CNO/LTC', 'CNO/DOGE', 'ONION/BTC', 'ONION/LTC', 'ONION/DOGE', 'VIVO/BTC', 'VIVO/LTC', 'VIVO/DOGE', 'TZC/BTC', 'TZC/LTC', 'TZC/DOGE', 'ETN/BTC', 'ETN/LTC', 'ETN/DOGE', 'ETN/USDT', 'ETN/NZDT', 'POWR/BTC', 'POWR/LTC', 'POWR/DOGE', 'WC/BTC', 'WC/LTC', 'WC/DOGE', 'IZE/BTC', 'IZE/LTC', 'IZE/DOGE', 'INN/BTC', 'INN/LTC', 'INN/DOGE', 'LCP/BTC', 'LCP/LTC', 'LCP/DOGE', 'BPL/BTC', 'BPL/LTC', 'BPL/DOGE', 'HAV/BTC', 'HAV/LTC', 'HAV/DOGE', 'EDDIE/BTC', 'EDDIE/LTC', 'EDDIE/DOGE', 'CRUR/LTC', 'CRUR/DOGE', 'HOLD/BTC', 'HOLD/LTC', 'HOLD/DOGE', 'ETHD/BTC', 'ETHD/LTC', 'ETHD/DOGE', 'ZAP/BTC', 'ZAP/LTC', 'ZAP/DOGE', 'MGX/BTC', 'MGX/LTC', 'MGX/DOGE', 'PHR/BTC', 'PHR/LTC', 'PHR/DOGE', 'XCPO/BTC', 'XCPO/LTC', 'XCPO/DOGE', 'DEUS/BTC', 'DEUS/LTC', 'DEUS/DOGE', 'HC/BTC', 'HC/LTC', 'HC/DOGE', 'GBX/BTC', 'GBX/LTC', 'GBX/DOGE', 'DGPT/BTC', 'DGPT/LTC', 'DGPT/DOGE', 'POLL/BTC', 'POLL/LTC', 'POLL/DOGE', 'BCPT/BTC', 'BCPT/LTC', 'BCPT/DOGE', 'HST/BTC', 'HST/LTC', 'HST/DOGE', 'OPC/BTC', 'OPC/LTC', 'OPC/DOGE', 'UNIT/BTC', 'UNIT/LTC', 'UNIT/DOGE', 'MONK/BTC', 'MONK/LTC', 'MONK/DOGE', 'VOISE/BTC', 'VOISE/LTC', 'VOISE/DOGE', 'DIVX/BTC', 'DIVX/LTC', 'DIVX/DOGE', 'PLX/BTC', 'PLX/LTC', 'PLX/DOGE', 'PBL/BTC', 'PBL/LTC', 'PBL/DOGE', 'BON/BTC', 'BON/LTC', 'BON/DOGE', 'HEAT/BTC', 'HEAT/LTC', 'HEAT/DOGE', 'AURS/BTC', 'AURS/LTC', 'AURS/DOGE', 'CMP/BTC', 'CMP/LTC', 'CMP/DOGE', 'TOK/BTC', 'TOK/LTC', 'TOK/DOGE', 'KBR/BTC', 'KBR/LTC', 'KBR/DOGE', 'DBET/BTC', 'DBET/LTC', 'DBET/DOGE', 'DNA/BTC', 'DNA/LTC', 'DNA/DOGE', 'SEND/BTC', 'SEND/LTC', 'SEND/DOGE', 'ELLA/BTC', 'ELLA/LTC', 'ELLA/DOGE', 'BWK/BTC', 'BWK/LTC', 'BWK/DOGE', 'PCOIN/BTC', 'PCOIN/LTC', 'PCOIN/DOGE', 'MAGE/BTC', 'MAGE/LTC', 'MAGE/DOGE', 'SAGA/BTC', 'SAGA/LTC', 'SAGA/DOGE', 'MATRX/BTC', 'MATRX/LTC', 'MATRX/DOGE', 'HBC/BTC', 'HBC/LTC', 'HBC/DOGE', 'CRC/BTC', 'CRC/LTC', 'CRC/DOGE', 'NMS/BTC', 'NMS/LTC', 'NMS/DOGE', 'SPANK/BTC', 'SPANK/LTC', 'SPANK/DOGE', 'STN/BTC', 'STN/LTC', 'STN/DOGE', 'WISH/BTC', 'WISH/LTC', 'WISH/DOGE', 'CAPP/BTC', 'CAPP/LTC', 'CAPP/DOGE', 'UFR/BTC', 'UFR/LTC', 'UFR/DOGE', 'PRL/BTC', 'PRL/LTC', 'PRL/DOGE'];
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
        arPair[0] = (arPair[0].toUpperCase() === 'USD') ? 'USDT' : arPair[0].toUpperCase();
        arPair[1] = (arPair[1].toUpperCase() === 'USD') ? 'USDT' : arPair[1].toUpperCase();
        return arPair;
    }

    setPair(arPair = ['btc', 'usd']) {
        arPair = this.modifyPair(arPair);
        const pairs = this.pairs;
        const varOne = `${arPair[0]}/${arPair[1]}`.toUpperCase();
        const varTwo = `${arPair[1]}/${arPair[0]}`.toUpperCase();
        if (pairs.indexOf(varOne) + 1) {
            this.pair = varOne;
            this.arPair = arPair;
        } else if (pairs.indexOf(varTwo) + 1) {
            this.isInvert = true;
            this.pair = varTwo;
            this.arPair = utils.reverse(arPair);
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
                        const bids = map(response.Buy, i => [i['Price'], i['Volume'], this.name]);
                        const asks = map(response.Sell, i => [i['Price'], i['Volume'], this.name]);
                        resolve({bids: bids, asks: asks});
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


    orderCreate(amount, price, type) {
        const pair = this.pair;
        let data = {
            Market: pair,
            Type: type,
            Amount: amount,
            Rate: price
        };

        return new Promise((resolve, reject) => {
            this.post('SubmitTrade', data).then(
                res => {
                    resolve({order_id: res['data']['OrderId']});
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