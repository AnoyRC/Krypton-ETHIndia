'use client';

import { ethers } from 'ethers';
import { useState } from 'react';

import ContactsItem from './ContactsItem';

const Contacts = () => {
  const signer = ethers.Wallet.createRandom();

  const [chats, setChats] = useState([
    {
      chatId:
        '6168440929ced5109c50534d40bb98a5e109ebf1d33df966ae898f002fac8973',
      about: null,
      did: 'eip155:0x14727F96dF61105661E78275D1A03C4F8aeff562',
      intent: 'eip155:0x14727F96dF61105661E78275D1A03C4F8aeff562',
      intentSentBy: 'eip155:0x14727F96dF61105661E78275D1A03C4F8aeff562',
      intentTimestamp: '2023-08-29T08:05:03.000Z',
      publicKey:
        '{"key":"-----BEGIN PGP PUBLIC KEY BLOCK-----\\n\\nxsBNBGTt9AcBCADXjt9OEXDQyE7w2veaHqTUN9fALt7c+cubz2nhWfmD07M1\\n5Spm3ScT/4HdlPpUBYnGUKlCT09g663RvvmDzp8442vZhfYeKbetrcNFxfnp\\n+ePQGiLDY0h2FmjQGkmZGP43ZLyhNT4eCIGPcPSpzaWAKw4wgE/tW2hli5m/\\n7e8HFno+bHp2ycNoPJpdqhY77CJL9zPqFdctCPxI5r1/+xkVLcf+NZ+vD7mz\\nq8xVpu3Tij5Jb5ShDPQ3qqPsqdCcB/fpnEtAOT/Ryuf5Qqic/bDrzImfaIO9\\nYmdnuc6uQBR1s8WbLHmOsQvJhe2D8MtggV5HwHbkPqxXBmpGIJnMeLHZABEB\\nAAHNAMLAigQQAQgAPgWCZO30BwQLCQcICZBvKHl019glPAMVCAoEFgACAQIZ\\nAQKbAwIeARYhBEyKE1gcoT4IIxerrG8oeXTX2CU8AADltgf/dREUaHmfMnwa\\nWwcoGxfya7xeSeqGLWoWsCDg55lq0rf59IFKw59AKL+4kKQrmVDW0x6oo844\\nxBv3NBq7OssNbRr4XYIXJN4oP8g0SdOYinTTcnHFjJcRHfTIa+lmlf7fwc7d\\n2DRW3Kyu66OGq9sLzcgI3Q4Fg3VOQGRDdVGF4zJGjPEpnHsJuGCVnbn5L94p\\nMZHEMIahYrYg2asglSByNUZIH+r0Y8rCzKp8rs37X/Q8RBrmW/oTnE/bb+xo\\n1jHgRR3MUs2Ea0oAqv/TwqpBRzMIWQ8tGKfEaJ22p02FJaE5q9KMbLp0mMIe\\nd33xGwOezLKoK5L9cHKg7wmz4sWvUs7ATQRk7fQHAQgApXcZbj43S5sr7v8d\\nq9JwcXkSdpRuzGw5zyauxUUElq2RLKPvsP8En+OJQceKWQcpvz16xLjnSoZI\\nfgIl1wXUaEb2T45rUrWmnoO+Csy2h6FePNmlHOerY2/C0GHQX3XP/B0t41By\\nG/o4losESsBaHEYugHIg5kXhgsGnlgoC3Bu4zHFmIvLlZXjCWYUG2JnhNHlG\\nrD67/Xuox1FO+Hh/rR7sSsWIH6S+SFgG/P4bwiW0JAYQP6bC4tbXfzvKJk2R\\ndeySnppEAwdn/3lCU5QscYIIUXSaPoV3Q6hg+wRigBk2ixkqdOTJmJROTOo3\\nUdnaeGSwP23USJIUncZWgcIokwARAQABwsB2BBgBCAAqBYJk7fQHCZBvKHl0\\n19glPAKbDBYhBEyKE1gcoT4IIxerrG8oeXTX2CU8AABx6Af/XRamjQ4T79rf\\nhNArQt3VuHvpIUP860MCg0aW5rMtZ8q4+TwOyjiEgOUIFx215Yprb3R3NTKV\\nQWJr8n++ZGDmQ8iro8nrRMRELmoEJzyWp3yr0dyr2lx01//bud+vVw+ARPLt\\nVUnX8eguLKRrltQmIRwCqX01PCTiN2RDB2Akd+zlBGRiHoavW9dDdGGBY9wW\\nA2Pyw73BeMzVA3akiGzLsdRIshO0DBALaX0G5ytqyIf3QjXOqO6C7gp9XW7R\\njXhRhzvR9NjZPmSXEeYqYw2CUPxzaLsKoSP4dbXE7Hl+sYJptzke7LE1StzH\\nG64gRgEYMCKvRZaPXYnPJXAZwDhijw==\\n=8aQd\\n-----END PGP PUBLIC KEY BLOCK-----\\n","signature":"DEPRECATED"}',
      profilePicture:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAsklEQVR4AcXBQY0DMRBE0Z+SCRhCsBhGAJiAYQwBgzGmZuDk2pPDSKPsqt57zNfzTVKPxX+K0ciEmTATZqXuSRajkdVjkcVoXKnHIovRyOqeZMJMmAmzEurcUffkF6FOJsyEmTAr3BTqXKks7hBmwkyYFb7UPflLdU+yUCcTZsJMmBW+hDong5O6J1diNE7EJWEmzIRZqccii9G4Eur8oh6LTJgJM2H2mK/nGyNhJsyE2QfJZChdHLm7QQAAAABJRU5ErkJggg==',
      threadhash: 'bafyreiewla5iyd7rnvjw2c5w6dbab4zkyf2desbowzouijoea2jzakxz6i',
      wallets: 'eip155:0x14727F96dF61105661E78275D1A03C4F8aeff562',
      combinedDID:
        'eip155:0x14727F96dF61105661E78275D1A03C4F8aeff562_eip155:0x84a9385e9b97df87b80c2e689997133703853874',
      name: null,
      groupInformation: null,
      msg: {
        fromDID: 'eip155:0x14727F96dF61105661E78275D1A03C4F8aeff562',
        toDID: 'eip155:0x84a9385e9b97df87b80c2e689997133703853874',
        messageObj: [Object],
        messageContent: 'Hello Alice!',
        messageType: 'Text',
        timestamp: 1693316103747,
        fromCAIP10: 'eip155:0x14727F96dF61105661E78275D1A03C4F8aeff562',
        toCAIP10: 'eip155:0x84a9385e9b97df87b80c2e689997133703853874',
        encryptedSecret:
          '-----BEGIN PGP MESSAGE-----\n' +
          '\n' +
          'wcBMA3d9z8TNUuddAQf/U2hMcybh5mUt9FFen5tfZ52PaB0vc2G+wYYIsBfu\n' +
          'zg58rgLy8uGMxvzhtCWhpIE91G62d8M4OmaDa+PLjs8SqyRoyih/9pt8P4cw\n' +
          'UJVHHDcJNC9r6/AV4aZySdz5u5utE7o3iB1FU0Sr9HEQsImmOM7J6LZJ3xWJ\n' +
          'V+o4ToLbqUFYKg2uY1kUXpyX+D6JRinagnAosh4zCICLUqrEkKNqbyV2mr+5\n' +
          'FK+fClWBGCwpf38L220FqHYPQ4bQXks0N07yW4OVjVpCTZVuNttr7PIEqcyZ\n' +
          'qIovbQbkltiDpsb/yYysEHTwBtvugna7xMW7SRY34x3iWm/HBNJmfBG7LnjI\n' +
          '6cHATAMrTKobmmcFTAEH/20nW6aNzfj1vn/5GIWjZ5Z4Rw6G3Syt+0NxPUix\n' +
          'dpKIFOR0/BEJkafGMdlk/vRElsyluKbzykBlIQ0hHGRpGMNEW8s8GrJeiXvV\n' +
          'JSNZ24u5DDk8DIBaJWJnyWM7XzgcmOmn9rvVbvc9qgNNgtDeMIZwUpiDipnA\n' +
          '++7n72h0JSs8dWFQ62FSf5ACHC0UVbPiL3TRrRBEo7vQp4JsJyXp70CUclqU\n' +
          '3ANLvNhINV6GGtpXEKnsBVkkg35HR92nIzk+8HL86SsRUYfXkufzXdkPpmRn\n' +
          'SG7MoDecNf/bwoqP8/l2X2h3R1c+WTQFb6Z+eK/NsJ/AnSErFZh3yEHAi1Rz\n' +
          'yIXSQAEA2KupLnBVC9fqZqhUySvOW/Hs/hD6iEEGIl+U/RC9AwdG2jpg4sVi\n' +
          'f9PhBJ5Tanynb3aHngRKtIzjP5m223A=\n' +
          '=5w+B\n' +
          '-----END PGP MESSAGE-----\n',
        encType: 'pgp',
        signature:
          '-----BEGIN PGP SIGNATURE-----\n' +
          '\n' +
          'wsBzBAEBCAAnBYJk7fQHCZBvKHl019glPBYhBEyKE1gcoT4IIxerrG8oeXTX\n' +
          '2CU8AACRLQf/bbeJoUNwRkJYz100R3ULO27HGjKnFeOaMZWRNF8JqWzNmCBL\n' +
          'Cj3aIBkDuCUj7avBsanScbSa7tD8Mc8PZgpSkd22nNH5iHiDJqlPtySJ2KoZ\n' +
          '3ekVXfOgfLlHtN78ghTxABewYQRuB6kwtv3XQW8X9sCL2jEF4NIIl5eXZvIT\n' +
          'nhbHhhOR47k2E0hiHjPv2t3ggrwkrw6ISDgV8qYcrnf7vEFeGHpeSc25QLJH\n' +
          'pXCeeHhH7h4C9L3PEdMt8T+Ne36cfNiwTGdOavin/yfNES6k0kqZxP44hn1M\n' +
          'ZBk4jfyaDUh70mv4FtxdPcdb1TGQsPC1YYAIh/059EBqkdJFhVF4+A==\n' +
          '=DBch\n' +
          '-----END PGP SIGNATURE-----\n',
        sigType: 'pgpv2',
        verificationProof:
          'pgpv2:-----BEGIN PGP SIGNATURE-----\n' +
          '\n' +
          'wsBzBAEBCAAnBYJk7fQHCZBvKHl019glPBYhBEyKE1gcoT4IIxerrG8oeXTX\n' +
          '2CU8AADsmwf/UpJCmnqztJLt1Ltg0OD7xoDvumitRwkfhnXzUdBWxM3i7vj4\n' +
          'cfjtcpQI2R5W0TXj9e2fymimIc98kjUqpDiUIaVAuD0OnEbJdIluGLBTJeks\n' +
          'YTRikqkgjFJT9Y6/2VRQj59IR0rgC0sec8mSKPlxuhixkdSS7Wec0+84cGmX\n' +
          'aieskReKeitKacYkU4Uf82Klc7Ft8+duBsaMGR3TS22PzHfYIHmy+8Z3b1SK\n' +
          'pMyJ8NBXCG2F+05WdoUsXBR+lO74RjSDWnWZlgRngWjjvSXQuZ/QznIyBVmQ\n' +
          'oOxJM5LSCCwH6ch5J/HmXudJG+3wsCINchvSQx0LntZUoeSp8cezvg==\n' +
          '=KUqZ\n' +
          '-----END PGP SIGNATURE-----\n',
        link: null,
      },
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="relative flex-1">
      {isLoading ? (
        <p className="text-primary-white/60 z-10 absolute left-1/2 animate-spin">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M8.175 7.377l-3.042-5.27 1.732-1 3.045 5.273c-.635.238-1.222.573-1.735.997zm-.799.8l-5.27-3.042-1 1.732 5.274 3.045c.237-.635.572-1.223.996-1.735zm-1.376 3.823c0-.341.035-.673.09-.999h-6.09v1.999h6.09c-.055-.326-.09-.659-.09-1zm11.351-2.705l5.208-3.007-.333-.577-5.206 3.007c.121.185.23.379.331.577zm-5.351-3.295c.341 0 .673.035.999.09v-6.09h-1.999v6.09c.326-.055.659-.09 1-.09zm3.14.894l3.004-5.204-.288-.166-3 5.197.284.173zm1.685 8.662l5.234 3.022.666-1.154-5.229-3.019c-.181.41-.408.794-.671 1.151zm-10.444-1.467l-5.274 3.046 1 1.732 5.27-3.042c-.424-.513-.759-1.1-.996-1.736zm11.594-2.589l.025.5-.025.5h6.025v-1h-6.025zm-3.727 6.061l3.03 5.249 1.442-.833-3.031-5.25c-.437.34-.92.623-1.441.834zm-2.248.439c-.341 0-.674-.035-1-.09v6.09h1.999v-6.09c-.326.055-.658.09-.999.09zm-3.824-1.376l-3.042 5.27 1.732 1 3.045-5.274c-.635-.237-1.222-.572-1.735-.996z" />
          </svg>
        </p>
      ) : chats.length === 0 ? (
        <p className="text-primary-white/60 py-2 text-center bg-gray-100 rounded-lg mt-2">
          No contacts to show
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {chats.map((chat, index) => (
            <ContactsItem key={index} chat={chat} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Contacts;
